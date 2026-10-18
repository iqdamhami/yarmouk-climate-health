const assert=require('assert');
// Pure calculation logic tests for v2.6 (aligned with checklist-expanded model)
const clamp=(n,min=0,max=100)=>Math.min(max,Math.max(min,n));
const normalizeTemperature=t=>clamp((t-18)/22*100);
const normalizeHumidity=h=>clamp(h<=40?0:(h-40)/60*100);
const normalizePrecip=p=>clamp(Math.abs(p-50)/100*100);
const normalizeAQI=a=>clamp(a/300*100);
const normalizeHealth=h=>clamp(h/100*100);
const normalizeVulnerability=v=>clamp(v);
const normalizeExposure=v=>clamp(Math.min(Number(v),7)/7*100);
const normalizeCapacity=c=>clamp(c);
const weights={heat:.30,humidity:.10,precip:.10,air:.15,health:.15,vulnerability:.10,capacity:.10};
function calculate(v){
  const factors={
    heat:normalizeTemperature(v.temperature),
    humidity:normalizeHumidity(v.humidity),
    precip:normalizePrecip(v.precip),
    air:normalizeAQI(v.aqi),
    health:normalizeHealth(v.health),
    vulnerability:normalizeVulnerability(v.vulnerability),
    capacity:normalizeCapacity(v.capacity)
  };
  const capacityRisk=100-factors.capacity;
  let base=factors.heat*weights.heat
    +factors.humidity*weights.humidity
    +factors.precip*weights.precip
    +factors.air*weights.air
    +factors.health*weights.health
    +factors.vulnerability*weights.vulnerability
    +capacityRisk*weights.capacity;
  const exposureFactor=1+Math.min(v.exposure,7)*.025;
  return {score:clamp(base*exposureFactor),base,exposureFactor,factors,capacityRisk}
}
function classify(s){s=Number(s);if(!Number.isFinite(s))return 'low';if(s<30)return 'low';if(s<60)return 'moderate';if(s<80)return 'high';return 'critical'}
function vulnerabilityClass(s){return classify(clamp(Number(s)))}
let passed=0;function test(name,fn){fn();passed++;console.log('PASS',name)}
test('clamp prevents out-of-range scores',()=>{assert.equal(clamp(-4),0);assert.equal(clamp(120),100)});
test('temperature normalization',()=>{assert.equal(normalizeTemperature(18),0);assert.equal(normalizeTemperature(40),100);assert.equal(normalizeTemperature(60),100)});
test('AQI normalization',()=>{assert.equal(normalizeAQI(0),0);assert.equal(normalizeAQI(300),100);assert.equal(normalizeAQI(500),100)});
test('humidity below comfort threshold is zero contribution',()=>assert.equal(normalizeHumidity(40),0));
test('precip extremes produce higher risk score',()=>{assert.equal(normalizePrecip(50),0);assert(normalizePrecip(0)>0);assert(normalizePrecip(150)>0)});
test('health normalization is bounded',()=>{assert.equal(normalizeHealth(50),50);assert.equal(normalizeHealth(1000),100)});
test('capacity is protective (higher capacity lowers base risk contribution)',()=>{
  const lowCap=calculate({temperature:30,humidity:50,precip:50,aqi:50,health:20,vulnerability:20,exposure:0,capacity:20});
  const highCap=calculate({temperature:30,humidity:50,precip:50,aqi:50,health:20,vulnerability:20,exposure:0,capacity:90});
  assert(highCap.score<lowCap.score)
});
test('weighted score is bounded and deterministic',()=>{const v={temperature:36,humidity:68,precip:12,aqi:145,health:42,vulnerability:38,exposure:3,capacity:55};const a=calculate(v),b=calculate(v);assert.equal(a.score,b.score);assert(a.score>0&&a.score<=100)});
test('exposure increases but does not dominate',()=>{const base=calculate({temperature:36,humidity:68,precip:12,aqi:145,health:42,vulnerability:38,exposure:0,capacity:55});const long=calculate({temperature:36,humidity:68,precip:12,aqi:145,health:42,vulnerability:38,exposure:30,capacity:55});assert(long.score>base.score);assert(long.score<=100);assert.equal(long.exposureFactor,1.175)});
test('exposure normalization matches the capped exposure contribution',()=>{assert.equal(normalizeExposure(0),0);assert.equal(normalizeExposure(3),300/7);assert.equal(normalizeExposure(7),100);assert.equal(normalizeExposure(30),100)});
test('vulnerability level matches index bands',()=>{assert.equal(vulnerabilityClass(0),'low');assert.equal(vulnerabilityClass(29.99),'low');assert.equal(vulnerabilityClass(30),'moderate');assert.equal(vulnerabilityClass(59.99),'moderate');assert.equal(vulnerabilityClass(60),'high');assert.equal(vulnerabilityClass(79.99),'high');assert.equal(vulnerabilityClass(80),'critical');assert.equal(vulnerabilityClass(100),'critical')});
test('classification thresholds',()=>{assert.equal(classify(0),'low');assert.equal(classify(29.99),'low');assert.equal(classify(30),'moderate');assert.equal(classify(60),'high');assert.equal(classify(80),'critical');assert.equal(classify(100),'critical')});
test('weights sum to 100 percent',()=>assert(Math.abs(Object.values(weights).reduce((a,b)=>a+b,0)-1)<1e-12));
test('exposure multiplier caps at 7 effective days',()=>{const v={temperature:36,humidity:68,precip:12,aqi:145,health:42,vulnerability:38,capacity:55};assert.equal(calculate({...v,exposure:7}).exposureFactor,1.175);assert.equal(calculate({...v,exposure:30}).exposureFactor,1.175)});
test('related condition logic does not infer disease from composite score alone',()=>{
  function related(r,v){const list=[];const heatHigh=v.temperature>=35||r.factors.heat>=75;const airHigh=v.aqi>=150||r.factors.air>=50;if(heatHigh)list.push('heat');if(airHigh)list.push('air');return list}
  const r=calculate({temperature:18,humidity:40,precip:50,aqi:0,health:100,vulnerability:100,exposure:0,capacity:50});
  assert(r.score>=30);assert.equal(related(r,{temperature:18,humidity:40,aqi:0}).length,0)
});
test('related condition triggers include precip extremes',()=>{
  function related(v){const out=[];if(v.temperature>=35)out.push('heat');if(v.aqi>=150)out.push('air');if(v.precip>80||v.precip<5)out.push('precip');return out}
  assert(related({temperature:36,aqi:80,precip:50}).includes('heat'));
  assert(related({temperature:25,aqi:180,precip:50}).includes('air'));
  assert(related({temperature:25,aqi:40,precip:2}).includes('precip'));
  assert.equal(related({temperature:25,aqi:40,precip:50}).length,0)
});
console.log(`\n${passed} tests passed.`);
