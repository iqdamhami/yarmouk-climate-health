(function(){'use strict';
const $=id=>document.getElementById(id);
const fields=['temperature','humidity','precip','aqi','health','vulnerability','exposure','capacity'];
const weights={heat:.30,humidity:.10,precip:.10,air:.15,health:.15,vulnerability:.10,capacity:.10};
const I18N={
 ar:{pageTitle:'مختبر اليرموك | تقييم قابلية التأثر الصحي بالمناخ',langBtn:'EN',theme:'تبديل المظهر',brand:'مختبر اليرموك',brandSub:'المناخ والصحة',eyebrow:'محلي • الخصوصية أولًا • نسخة أولية • تقييم متعدد الدول',title:'مؤشر المخاطر المناخية–الصحية',badge:'0–100',
formula:'المعادلة: المؤشر الأساسي = (الحرارة × 30%) + (الرطوبة × 10%) + (الهطول × 10%) + (جودة الهواء × 15%) + (المؤشر الصحي × 15%) + (الهشاشة × 10%) + (قدرة النظام × 10%). قدرة النظام تُطرح كمساهمة وقائية. ثم تُطبَّق زيادة محدودة للتعرض = المؤشر الأساسي × (1 + 0.025 × عدد أيام التعرض الفعّالة)، مع احتساب حد أقصى 7 أيام للتعرض في المضاعف، والنتيجة النهائية محصورة بين 0 و100.',
termsTitle:'تعريف المصطلحات البيئية والمؤشرات',termsIntro:'يوضح الجدول معنى كل مصطلح، ووحدة القياس، وكيفية تحويله داخل هذا النموذج. قيمة «الدرجة 0–100» هي قيمة النموذج وليست بالضرورة تصنيفًا رسميًا للمؤشر الأصلي. الفئات مستمدة من قائمة جمع البيانات لتقييم قابلية التأثر الصحي بالمناخ.',
termCol:'المصطلح',definitionCol:'التعريف',unitCol:'الوحدة / المجال',ruleCol:'قاعدة التحويل في المنصة',weightCol:'الوزن',
intro:'أداة تفاعلية لحساب مؤشر توضيحي من 100 اعتمادًا على الظروف المناخية، جودة الهواء، المؤشرات الصحية الحساسة للمناخ، وهشاشة السكان. مصممة لتتوافق مع قائمة جمع البيانات لتقييم قابلية التأثر الصحي بالمناخ والاستعداد للطوارئ (الأردن أساسًا، تونس، الجزائر، لبنان، اليمن، الإمارات). تتم المعالجة داخل المتصفح ولا يتم رفع المدخلات إلى خادم.',
sample:'تجربة بيانات نموذجية',reset:'مسح المدخلات',print:'طباعة / PDF',privacyTitle:'الخصوصية أولًا',privacy:'لا توجد قاعدة بيانات أو حسابات أو رفع للبيانات. النتائج تُحسب محليًا في جهازك.',
dataTitle:'بيانات التقييم',dataHelp:'أدخل القيم المتاحة وفق فئات قائمة جمع البيانات (سكان، مناخ، بيئة، نتائج صحية حساسة للمناخ، نظام صحي، استعداد). جميع الحقول قابلة للتعديل.',
location:'الموقع / المحافظة',date:'الفترة الزمنية',dateSep:'إلى',dateFrom:'من تاريخ',dateTo:'إلى تاريخ',
temperature:'درجة الحرارة (°C)',humidity:'الرطوبة النسبية (%)',precip:'هطول الأمطار (مم)',
temperatureLevel:'مستوى الحرارة: {level} ({score}/100)',humidityLevel:'مستوى الرطوبة: {level} ({score}/100)',precipLevel:'مستوى الهطول: {level} ({score}/100)',
aqi:'جودة الهواء AQI / PM2.5',health:'المؤشر الصحي (حالات/10,000)',vulnerability:'هشاشة السكان (%)',
vulnerabilityLevel:'مستوى الهشاشة: {level} ({score}%)',vulnPending:'مستوى الهشاشة: بانتظار الإدخال',
aqiLevel:'مستوى جودة الهواء: {level} ({score})',healthLevel:'مستوى المؤشر الصحي: {level} ({score})',
exposureLevel:'مستوى التعرض: {level} ({score}/100)',capacityLevel:'مستوى القدرة: {level} ({score}/100)',
indicatorPending:'{label}: بانتظار الإدخال',exposure:'مدة التعرض (أيام)',capacity:'قدرة النظام الصحي / الاستعداد (%)',
locPh:'مثال: إربد',tempPh:'30',humPh:'60',precipPh:'5',aqiPh:'80',healthPh:'20',vulnPh:'25',exposurePh:'1',capacityPh:'60',
calc:'احسب مؤشر الخطر',resultTitle:'النتيجة',resultIdle:'أدخل البيانات ثم اضغط «احسب مؤشر الخطر».',waiting:'بانتظار التقييم',resultSummary:'سيظهر هنا ملخص النتيجة والتفسير.',
general:'إرشادات عامة',generalText:'استخدم المؤشر كأداة فرز واستكشاف، وليس كتشخيص طبي أو تنبؤ مؤكد.',
methodology:'كيف يُحسب المؤشر؟',methodologyHelp:'نموذج أولي قابل للمعايرة لاحقًا وفق بيانات ودراسات معتمدة وقائمة جمع البيانات متعددة الفئات.',
heat:'الإجهاد الحراري',air:'جودة الهواء',healthFactor:'المؤشر الصحي',vulnerabilityFactor:'هشاشة السكان',precipFactor:'الهطول / التطرفات',capacityFactor:'قدرة النظام الصحي',
note:'تُحوَّل المدخلات إلى درجات 0–100 وفق قواعد النموذج الحالية ثم تُجمع بالأوزان. هذه الحدود والأوزان خاصة بالنموذج الأولي وليست معايير طبية أو بيئية رسمية؛ يجب معايرتها قبل أي استخدام تشغيلي أو بحثي. يتوافق النموذج مع فئات قائمة جمع البيانات: السكان، المناخ، البيئة، النتائج الصحية، النظام الصحي، الاستعداد.',
guide:'تفسير النتيجة',low:'منخفض',moderate:'متوسط',high:'مرتفع',critical:'مرتفع جدًا',
footer:'نسخة MVP محلية — متوافقة مع قائمة جمع البيانات متعددة الدول — لا تخزن البيانات مركزيًا.',
locationUnknown:'الموقع غير محدد',composite:'المؤشر المركب {score} من 100، محسوب من عوامل متعددة وباستخدام مدة التعرض كمضاعف محدود وقدرة النظام كمساهم وقائي.',
warning:'المؤشر أداة تحليلية أولية وليس تشخيصًا طبيًا أو إنذارًا رسميًا.',
required:'يرجى إدخال {label}.',range:'{label} يجب أن تكون بين {min} و{max}.',
recTemp:'ارتفاع الحرارة: راجع خطط الوقاية من الإجهاد الحراري وقلّل التعرض المباشر للحرارة.',
recAqi:'جودة الهواء مرتفعة الخطورة: راقب الإرشادات البيئية وقلّل الأنشطة الخارجية عند الحاجة.',
recVuln:'هشاشة سكانية مرتفعة: أعطِ الأولوية للفئات الحساسة (أطفال، كبار سن، حوامل، لاجئون، عمال خارجيون) عند التخطيط للاستجابة.',
recExposure:'مدة التعرض متعددة الأيام: راقب المؤشر يوميًا بدل الاعتماد على قراءة واحدة.',
recPrecip:'هطول غير معتاد: راقب مخاطر الفيضانات أو الجفاف المرتبطة بالصحة (أمراض إسهالية، نواقل).',
recCapacity:'قدرة نظام صحي محدودة: عزّز الاستعداد وخطط الطوارئ وسلاسل التوريد.',
recLow:'المؤشرات المدخلة ضمن نطاق منخفض نسبيًا؛ استمر في المراقبة.',
recGeneral:'المؤشرات تستدعي مراجعة الإجراءات الوقائية والبيانات المتاحة.',
conditionsTitle:'حالات صحية تستدعي الانتباه',conditionsIntro:'حالات قد تتأثر بالحرارة أو جودة الهواء أو الظروف المناخية وفق المؤشرات المدخلة. هذه القائمة للتوعية وليست تشخيصًا.',
conditionsBadge:'مرتبطة بالمؤشرات',conditionsEmpty:'ستظهر الحالات ذات الصلة بعد حساب المؤشر.',
conditionHeat:'أمراض القلب والأوعية الدموية',conditionHeatDesc:'قد تؤدي الحرارة الشديدة إلى زيادة العبء على القلب وتفاقم بعض الحالات القلبية الوعائية.',
conditionDiabetes:'داء السكري',conditionDiabetesDesc:'قد تزيد الحرارة الشديدة صعوبة تنظيم السوائل والحرارة لدى بعض المصابين بالسكري.',
conditionRespiratory:'الربو وأمراض الجهاز التنفسي المزمنة',conditionRespiratoryDesc:'يمكن للحرارة وتلوث الهواء أن يزيدا الأعراض أو يفاقما بعض أمراض الجهاز التنفسي.',
conditionCOPD:'مرض الانسداد الرئوي المزمن (COPD)',conditionCOPDDesc:'ارتفاع تلوث الهواء، وخاصة الجسيمات الدقيقة، قد يزيد مخاطر تفاقم أمراض الجهاز التنفسي المزمنة.',
conditionKidney:'أمراض الكلى',conditionKidneyDesc:'الحرارة والجفاف قد يزيدان الضغط على الكلى ويرفعان مخاطر الإصابة الحادة لدى الفئات المعرضة.',
conditionHeatIllness:'الإجهاد الحراري والجفاف وضربة الشمس',conditionHeatIllnessDesc:'عند ارتفاع الحرارة ومدة التعرض قد تزداد مخاطر الإنهاك الحراري والجفاف وضربة الشمس.',
conditionAirCardio:'أمراض القلب الإقفارية والسكتة الدماغية',conditionAirCardioDesc:'تلوث الهواء، وخاصة الجسيمات الدقيقة، يرتبط بآثار قلبية ووعائية وعصبية.',
conditionDiarrheal:'الأمراض الإسهالية والمنقولة بالمياه',conditionDiarrhealDesc:'التطرفات في الهطول (فيضانات أو جفاف) قد تزيد مخاطر الأمراض الإسهالية والتهاب الكبد والكوليرا.',
conditionVector:'الأمراض المنقولة بالنواقل',conditionVectorDesc:'تغيرات الحرارة والهطول قد تؤثر على توزيع نواقل الملاريا والليشمانيا وحمى الضنك.',
conditionNote:'إذا كان الشخص يعاني من حالات مزمنة أو أعراض مقلقة فليطلب استشارة طبية متخصصة. ضربة الشمس حالة طبية طارئة.',
sampleLocation:'إربد',
fieldNote:'المؤشر الصحي يغطي النتائج الحساسة للمناخ (ضربات الحرارة، أمراض تنفسية، إسهالية، منقولة بالنواقل، تغذية، صحة نفسية، مهنية). الهشاشة تشمل الأطفال دون 5، كبار السن، الحوامل، اللاجئين/النازحين، العمال الخارجيين، ذوي الأمراض المزمنة. القدرة تشمل المستشفيات، الأسرة، القوى العاملة، أنظمة الإنذار، خطط الاستعداد.',
checklistTitle:'مرجع فئات جمع البيانات',checklistIntro:'يتوافق هذا النموذج مع قائمة جمع البيانات لتقييم قابلية التأثر الصحي بالمناخ والاستعداد للطوارئ (Phase 1). الفئات الرئيسية:',
terms:[
['درجة الحرارة','درجة حرارة الهواء المحيط المستخدمة لتمثيل شدة الحرارة في التقييم (فئة المناخ).','°C؛ الإدخال −30 إلى 60','الدرجة = clamp((T−18)/22×100)','30%'],
['الرطوبة النسبية','نسبة بخار الماء الموجود في الهواء إلى أقصى كمية يمكن أن يحتويها عند درجة الحرارة نفسها.','%؛ 0 إلى 100','≤40% = 0؛ ثم (RH−40)/60×100 مع حصرها 0–100','10%'],
['هطول الأمطار','كمية الهطول المستخدمة لتمثيل مخاطر الفيضانات أو الجفاف المرتبطة بالصحة.','مم؛ 0 إلى 500','درجة المخاطرة = clamp(|P−50|/100×100) لتمثيل التطرف','10%'],
['جودة الهواء AQI','مؤشر عددي يُستخدم هنا كمدخل لتمثيل مستوى تلوث الهواء وPM2.5.','AQI؛ 0 إلى 500','الدرجة = clamp(AQI/300×100)','15%'],
['المؤشر الصحي','معدل الحالات الصحية الحساسة للمناخ لكل 10,000 (حرارة، تنفسية، إسهالية، نواقل، تغذية، نفسية، مهنية).','حالات/10,000؛ 0 إلى 1000','الدرجة = clamp(الحالات/100×100)','15%'],
['هشاشة السكان','نسبة تقديرية تمثل قابلية السكان للتأثر (أطفال <5، كبار سن، حوامل، لاجئون، عمال خارجيون، أمراض مزمنة).','%؛ 0 إلى 100','تُستخدم مباشرة كدرجة 0–100','10%'],
['مدة التعرض','عدد الأيام التي تستمر خلالها حالة التعرض المدخلة.','أيام؛ إدخال 0 إلى 30','يُحتسب في المضاعف بحد أقصى 7 أيام: 1 + 0.025×الأيام','مضاعف محدود'],
['قدرة النظام الصحي','تقدير لقدرة المرافق والقوى العاملة وأنظمة الإنذار وخطط الاستعداد على الاستجابة.','%؛ 0 إلى 100','تُستخدم كمساهم وقائي: (100−القدرة) في المعادلة','10% (وقائي)'],
['الإجهاد الحراري','العبء الواقع على الجسم عندما تتجاوز الحرارة والظروف المحيطة قدرة الجسم على تبريد نفسه.','مصطلح وصفي؛ ممثل هنا بدرجة الحرارة والرطوبة','لا يُحسب بمؤشر حراري رسمي؛ يُمثَّل بعامل الحرارة + عامل الرطوبة','30% + 10%'],
['التعرض','استمرار تعرض الشخص أو المجتمع للظروف التي تدخل في التقييم خلال فترة زمنية محددة.','أيام','يزيد المؤشر بحد أقصى 17.5% عبر مضاعف التعرض','مضاعف'],
['الهشاشة','قابلية الأفراد أو السكان للتأثر والضرر عند التعرض لخطر مناخي، بحسب الخصائص والظروف الاجتماعية والصحية.','مصطلح وصفي؛ يُدخل كنسبة','تُستخدم النسبة المدخلة مباشرة كدرجة 0–100','10%'],
['المؤشر المركب','قيمة واحدة تلخص العوامل بعد تحويلها إلى مقياس مشترك ودمجها بالأوزان المحددة مع مضاعف التعرض.','درجة 0–100','المجموع الموزون (مع طرح القدرة الوقائية) ثم مضاعف التعرض، مع حصر النتيجة 0–100','100% من الأساس']
]},
 en:{pageTitle:'Yarmouk Lab | Climate–Health Vulnerability Assessment',langBtn:'AR',theme:'Toggle theme',brand:'Yarmouk Lab',brandSub:'Climate & Health',eyebrow:'LOCAL • PRIVACY-FIRST • MVP • MULTI-COUNTRY',title:'Climate–Health Risk Index',badge:'0–100',
formula:'Formula: Base index = (temperature × 30%) + (humidity × 10%) + (precipitation × 10%) + (air quality × 15%) + (health indicator × 15%) + (vulnerability × 10%) + (system capacity × 10%). Capacity acts as a protective contribution (higher capacity lowers risk). A limited exposure increase is then applied: base index × (1 + 0.025 × effective exposure days), with exposure capped at 7 days; final result bounded to 0–100.',
termsTitle:'Environmental terms and indicators',termsIntro:'The table explains each term, its unit, and how it is transformed in this model. The model score (0–100) is not necessarily an official classification. Categories are aligned with the multi-country climate-health data collection checklist.',
termCol:'Term',definitionCol:'Definition',unitCol:'Unit / range',ruleCol:'Platform transformation',weightCol:'Weight',
intro:'An interactive tool that calculates an illustrative 0–100 index from climate conditions, air quality, climate-sensitive health indicators, and population vulnerability. Designed to align with the Climate-Related Health Vulnerability & Emergency Preparedness Assessment data checklist (Jordan primary; Tunisia, Algeria, Lebanon, Yemen, UAE). Processing runs in the browser; inputs are not uploaded.',
sample:'Try sample data',reset:'Clear inputs',print:'Print / PDF',privacyTitle:'Privacy first',privacy:'No database, accounts, or data uploads. Results are calculated locally on your device.',
dataTitle:'Assessment data',dataHelp:'Enter available values aligned with the data collection checklist categories (population, climate, environment, climate-sensitive health outcomes, health system, preparedness). All fields are editable.',
location:'Location / governorate',date:'Time period',dateSep:'to',dateFrom:'From date',dateTo:'To date',
temperature:'Temperature (°C)',humidity:'Relative humidity (%)',precip:'Precipitation (mm)',
temperatureLevel:'Temperature level: {level} ({score}/100)',humidityLevel:'Humidity level: {level} ({score}/100)',precipLevel:'Precipitation level: {level} ({score}/100)',
aqi:'Air quality AQI / PM2.5',health:'Health indicator (cases/10,000)',vulnerability:'Population vulnerability (%)',
vulnerabilityLevel:'Vulnerability level: {level} ({score}%)',vulnPending:'Vulnerability level: awaiting input',
aqiLevel:'Air quality level: {level} ({score})',healthLevel:'Health indicator level: {level} ({score})',
exposureLevel:'Exposure level: {level} ({score}/100)',capacityLevel:'Capacity level: {level} ({score}/100)',
indicatorPending:'{label}: awaiting input',exposure:'Exposure duration (days)',capacity:'Health system capacity / preparedness (%)',
locPh:'Example: Irbid',tempPh:'30',humPh:'60',precipPh:'5',aqiPh:'80',healthPh:'20',vulnPh:'25',exposurePh:'1',capacityPh:'60',
calc:'Calculate risk index',resultTitle:'Result',resultIdle:'Enter the data and select “Calculate risk index”.',waiting:'Awaiting assessment',resultSummary:'The result summary and interpretation will appear here.',
general:'General guidance',generalText:'Use this index for screening and exploration, not for medical diagnosis or definitive prediction.',
methodology:'How is the index calculated?',methodologyHelp:'A prototype model that can later be calibrated using validated data, studies, and the multi-category data collection checklist.',
heat:'Heat stress',air:'Air quality',healthFactor:'Health indicator',vulnerabilityFactor:'Population vulnerability',precipFactor:'Precipitation / extremes',capacityFactor:'Health system capacity',
note:'Each factor is normalized to 0–100 and combined using the stated weights. Capacity is protective (higher capacity reduces risk). Exposure duration is a limited multiplier. This is an illustrative model aligned with checklist categories, not a validated medical measure.',
guide:'Result interpretation',low:'Low',moderate:'Moderate',high:'High',critical:'Very high',
footer:'Local MVP — aligned with multi-country data collection checklist — no centralized data storage.',
locationUnknown:'Location not specified',composite:'Composite index: {score} / 100, calculated from multiple factors with a limited exposure multiplier and protective system capacity.',
warning:'This is a preliminary analytical tool, not a medical diagnosis or official warning.',
required:'Please enter {label}.',range:'{label} must be between {min} and {max}.',
recTemp:'High temperature: review heat-stress prevention measures and reduce direct heat exposure.',
recAqi:'High-risk air quality: follow environmental guidance and reduce outdoor activity when appropriate.',
recVuln:'High population vulnerability: prioritize sensitive groups (children, older adults, pregnant women, refugees, outdoor workers) in response planning.',
recExposure:'Multi-day exposure: monitor the index daily rather than relying on a single reading.',
recPrecip:'Unusual precipitation: monitor flood or drought-related health risks (diarrheal disease, vectors).',
recCapacity:'Limited health system capacity: strengthen preparedness, emergency plans, and supply chains.',
recLow:'The entered indicators are relatively low; continue monitoring.',
recGeneral:'The indicators warrant review of preventive measures and available data.',
conditionsTitle:'Health conditions requiring attention',conditionsIntro:'Conditions that may be affected by heat, air quality, or climate extremes based on the entered indicators. This is not a diagnosis.',
conditionsBadge:'Indicator-linked',conditionsEmpty:'Relevant conditions will appear after calculating the index.',
conditionHeat:'Cardiovascular diseases',conditionHeatDesc:'Extreme heat can increase cardiovascular strain and worsen some cardiovascular conditions.',
conditionDiabetes:'Diabetes',conditionDiabetesDesc:'Extreme heat can make fluid and temperature regulation more difficult for some people with diabetes.',
conditionRespiratory:'Asthma and chronic respiratory diseases',conditionRespiratoryDesc:'Heat and air pollution can increase symptoms or worsen some respiratory conditions.',
conditionCOPD:'Chronic obstructive pulmonary disease (COPD)',conditionCOPDDesc:'High air pollution, especially fine particulate matter, can increase risks for exacerbations of chronic respiratory disease.',
conditionKidney:'Kidney diseases',conditionKidneyDesc:'Heat and dehydration can increase stress on the kidneys and the risk of acute kidney injury in vulnerable people.',
conditionHeatIllness:'Heat exhaustion, dehydration and heatstroke',conditionHeatIllnessDesc:'High heat combined with longer exposure can increase the risk of heat illness and dehydration.',
conditionAirCardio:'Ischaemic heart disease and stroke',conditionAirCardioDesc:'Air pollution, especially fine particulate matter, is associated with cardiovascular and cerebrovascular effects.',
conditionDiarrheal:'Diarrheal and water-borne diseases',conditionDiarrhealDesc:'Precipitation extremes (floods or drought) can increase risks of diarrheal disease, hepatitis and cholera.',
conditionVector:'Vector-borne diseases',conditionVectorDesc:'Temperature and precipitation changes can affect the distribution of malaria, leishmaniasis and dengue vectors.',
conditionNote:'People with chronic conditions or concerning symptoms should seek professional medical advice. Heatstroke is a medical emergency.',
sampleLocation:'Irbid',
fieldNote:'The health indicator covers climate-sensitive outcomes (heat illness, respiratory, diarrheal, vector-borne, nutrition, mental, occupational). Vulnerability includes children under 5, older adults, pregnant women, refugees/IDPs, outdoor workers, and people with chronic conditions. Capacity covers hospitals, beds, workforce, alert systems, and preparedness plans.',
checklistTitle:'Data collection checklist reference',checklistIntro:'This model aligns with the Climate-Related Health Vulnerability & Emergency Preparedness Assessment data collection checklist (Phase 1). Main categories:',
terms:[
['Temperature','Ambient air temperature used to represent heat intensity in the assessment (climate category).','°C; input −30 to 60','score = clamp((T−18)/22×100)','30%'],
['Relative humidity','The ratio of water vapour in the air to the maximum amount it can hold at the same temperature.','%; 0 to 100','≤40% = 0; then (RH−40)/60×100, bounded 0–100','10%'],
['Precipitation','Rainfall amount used to represent flood or drought health risks.','mm; 0 to 500','risk score = clamp(|P−50|/100×100) for extremes','10%'],
['Air Quality AQI','A numerical air-pollution indicator used here for pollution and PM2.5 levels.','AQI; 0 to 500','score = clamp(AQI/300×100)','15%'],
['Health indicator','Entered rate of climate-sensitive health cases per 10,000 (heat, respiratory, diarrheal, vector, nutrition, mental, occupational).','cases/10,000; 0 to 1,000','score = clamp(cases/100×100)','15%'],
['Population vulnerability','An estimated percentage representing susceptibility (children <5, older adults, pregnant women, refugees, outdoor workers, chronic conditions).','%; 0 to 100','used directly as a 0–100 score','10%'],
['Exposure duration','Number of days for which the assessed exposure condition persists.','days; input 0 to 30','used in the multiplier with a 7-day cap: 1 + 0.025×days','limited multiplier'],
['Health system capacity','Estimate of facility, workforce, alert systems and preparedness plan capacity to respond.','%; 0 to 100','used as protective contribution: (100−capacity) in the equation','10% (protective)'],
['Heat stress','Physiological strain when heat and surrounding conditions challenge the body’s ability to cool itself.','Descriptive term; represented here by temperature and humidity','No official heat-index formula is used; represented by the temperature + humidity factors','30% + 10%'],
['Exposure','The duration of contact of people or communities with the assessed climate or environmental conditions.','days','increases the index by up to 17.5% through the exposure multiplier','multiplier'],
['Vulnerability','The susceptibility of people or populations to harm when exposed to a climate hazard, influenced by social and health conditions.','Descriptive term; entered as a percentage','entered percentage is used directly as a 0–100 score','10%'],
['Composite index','A single value summarising the factors after conversion to a common scale and weighted combination with exposure multiplier.','0–100 score','weighted base score (with protective capacity), then exposure multiplier, bounded to 0–100','100% of base']
]}
};
let currentLang='ar';
const t=k=>I18N[currentLang][k]??k;
const interpolate=(s,vars)=>s.replace(/\{(\w+)\}/g,(_,k)=>vars[k]??'');
const clamp=v=>Math.max(0,Math.min(100,Number(v)||0));
function num(id){return Number($(id).value)}
function normalizeTemperature(t){return clamp((t-18)/22*100)}
function normalizeHumidity(h){return clamp(h<=40?0:(h-40)/60*100)}
function normalizePrecip(p){return clamp(Math.abs(p-50)/100*100)} // extremes around 50mm as mid
function normalizeAQI(a){return clamp(a/300*100)}
function normalizeHealth(h){return clamp(h/100*100)}
function normalizeVulnerability(v){return clamp(v)}
function normalizeExposure(v){return clamp(Math.min(Number(v),7)/7*100)}
function normalizeCapacity(c){return clamp(c)} // higher capacity is better (protective)
function classify(score){
 score=Number(score);
 if(!Number.isFinite(score))return ['low','low'];
 if(score<30)return ['low','low'];
 if(score<60)return ['moderate','moderate'];
 if(score<80)return ['high','high'];
 return ['critical','critical']
}
function vulnerabilityClass(score){return classify(clamp(Number(score)))}
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
 // capacity is protective: contribution is (100 - capacity_score)
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
function validate(){
 const errors=[];
 const ranges={
  temperature:[-30,60,'temperature'],
  humidity:[0,100,'humidity'],
  precip:[0,500,'precip'],
  aqi:[0,500,'aqi'],
  health:[0,1000,'health'],
  vulnerability:[0,100,'vulnerability'],
  exposure:[0,30,'exposure'],
  capacity:[0,100,'capacity']
 };
 for(const [id,[min,max,key]] of Object.entries(ranges)){
  const raw=$(id).value.trim();
  const label=t(key);
  if(raw===''){errors.push(interpolate(t('required'),{label}));continue}
  const n=Number(raw);
  if(!Number.isFinite(n)||n<min||n>max)errors.push(interpolate(t('range'),{label,min,max}))
 }
 // date range optional but if both present check order
 const df=$('dateFrom').value,dt=$('dateTo').value;
 if(df&&dt&&df>dt)errors.push(currentLang==='ar'?'تاريخ البداية يجب أن يسبق تاريخ النهاية.':'Start date must be before end date.');
 return errors
}
function recommendations(score,v){
 const out=[];
 if(v.temperature>=35)out.push(t('recTemp'));
 if(v.aqi>=150)out.push(t('recAqi'));
 if(v.vulnerability>=40)out.push(t('recVuln'));
 if(v.exposure>=3)out.push(t('recExposure'));
 if(v.precip>80||v.precip<5)out.push(t('recPrecip'));
 if(v.capacity<50)out.push(t('recCapacity'));
 if(!out.length)out.push(score<30?t('recLow'):t('recGeneral'));
 return out
}
function relatedConditions(r,v){
 const list=[];
 const heatHigh=v.temperature>=35||r.factors.heat>=75;
 const airHigh=v.aqi>=150||r.factors.air>=50;
 const humidHeat=heatHigh&&v.humidity>=60;
 const prolonged=v.exposure>=3;
 const precipExtreme=v.precip>80||v.precip<5;
 if(heatHigh||humidHeat){
  list.push(['conditionHeat','conditionHeatDesc','heat']);
  list.push(['conditionHeatIllness','conditionHeatIllnessDesc','heat']);
  list.push(['conditionKidney','conditionKidneyDesc','heat']);
  list.push(['conditionDiabetes','conditionDiabetesDesc','heat'])
 }
 if(airHigh){
  list.push(['conditionRespiratory','conditionRespiratoryDesc','air']);
  list.push(['conditionCOPD','conditionCOPDDesc','air']);
  list.push(['conditionAirCardio','conditionAirCardioDesc','air'])
 }
 if(precipExtreme){
  list.push(['conditionDiarrheal','conditionDiarrhealDesc','precip']);
  list.push(['conditionVector','conditionVectorDesc','precip'])
 }
 if(prolonged&&heatHigh&&!list.some(x=>x[0]==='conditionHeatIllness'))list.push(['conditionHeatIllness','conditionHeatIllnessDesc','heat']);
 return list.slice(0,6)
}
function renderConditions(r,v){
 const list=relatedConditions(r,v);
 const el=$('conditionsList');
 if(!list.length){el.innerHTML='<p class="conditions-empty">'+t('conditionsEmpty')+'</p>';return}
 el.innerHTML=list.map(([title,desc,cls])=>'<div class="condition-item '+cls+'"><strong>'+t(title)+'</strong><p>'+t(desc)+'</p></div>').join('')+'<p class="condition-note">'+t('conditionNote')+'</p>'
}
function levelLabel(cls){return t(cls)}
function renderIndicatorLevel(id,score,levelKey){
 const el=$(id);
 if(!el)return;
 const [cls]=classify(score);
 el.textContent=interpolate(t(levelKey),{level:levelLabel(cls),score:Math.round(score)});
 el.className='field-level '+cls
}
function renderIndicatorTable(){
 const body=$('indicatorTableBody');
 if(!body)return;
 const terms=I18N[currentLang].terms||[];
 body.innerHTML=terms.map(row=>'<tr>'+row.map(c=>'<td>'+c+'</td>').join('')+'</tr>').join('')
}
function renderInputLevels(){
 const tVal=num('temperature'),hVal=num('humidity'),pVal=num('precip'),aVal=num('aqi'),heVal=num('health'),eVal=num('exposure'),cVal=num('capacity');
 if($('temperature').value!=='')renderIndicatorLevel('temperatureLevel',normalizeTemperature(tVal),'temperatureLevel');
 else if($('temperatureLevel')){$('temperatureLevel').textContent=interpolate(t('indicatorPending'),{label:t('temperature')});$('temperatureLevel').className='field-level neutral'}
 if($('humidity').value!=='')renderIndicatorLevel('humidityLevel',normalizeHumidity(hVal),'humidityLevel');
 else if($('humidityLevel')){$('humidityLevel').textContent=interpolate(t('indicatorPending'),{label:t('humidity')});$('humidityLevel').className='field-level neutral'}
 if($('precip').value!=='')renderIndicatorLevel('precipLevel',normalizePrecip(pVal),'precipLevel');
 else if($('precipLevel')){$('precipLevel').textContent=interpolate(t('indicatorPending'),{label:t('precip')});$('precipLevel').className='field-level neutral'}
 if($('aqi').value!=='')renderIndicatorLevel('aqiLevel',normalizeAQI(aVal),'aqiLevel');
 else if($('aqiLevel')){$('aqiLevel').textContent=interpolate(t('indicatorPending'),{label:t('air')});$('aqiLevel').className='field-level neutral'}
 if($('health').value!=='')renderIndicatorLevel('healthLevel',normalizeHealth(heVal),'healthLevel');
 else if($('healthLevel')){$('healthLevel').textContent=interpolate(t('indicatorPending'),{label:t('healthFactor')});$('healthLevel').className='field-level neutral'}
 if($('exposure').value!=='')renderIndicatorLevel('exposureLevel',normalizeExposure(eVal),'exposureLevel');
 else if($('exposureLevel')){$('exposureLevel').textContent=interpolate(t('indicatorPending'),{label:t('exposure')});$('exposureLevel').className='field-level neutral'}
 if($('capacity').value!=='')renderIndicatorLevel('capacityLevel',normalizeCapacity(cVal),'capacityLevel');
 else if($('capacityLevel')){$('capacityLevel').textContent=interpolate(t('indicatorPending'),{label:t('capacity')});$('capacityLevel').className='field-level neutral'}
}
function renderVulnerability(){
 const raw=$('vulnerability').value.trim();
 const el=$('vulnerabilityLevel');
 if(!el)return;
 if(raw===''){el.textContent=t('vulnPending');el.className='field-level neutral';return}
 const score=clamp(Number(raw));
 const [cls]=classify(score);
 el.textContent=interpolate(t('vulnerabilityLevel'),{level:levelLabel(cls),score:Math.round(score)});
 el.className='field-level '+cls
}
function render(r,v){
 const score=Math.round(r.score);
 const [cls,label]=classify(score);
 $('score').textContent=score;
 $('level').textContent=levelLabel(label);
 $('level').className='level '+cls;
 const ring=$('scoreRing');
 ring.style.setProperty('--score-deg',(score/100*360)+'deg');
 ring.className='score-ring risk-'+cls;
 const panel=$('resultPanel');
 panel.className='panel result risk-'+cls;
 const loc=$('location').value.trim()||t('locationUnknown');
 const df=$('dateFrom').value,dt=$('dateTo').value;
 let period='';
 if(df||dt)period=' | '+(df||'?')+' – '+(dt||'?');
 $('summary').textContent=interpolate(t('composite'),{score})+' — '+loc+period+'. '+t('warning');
 $('resultSubtitle').textContent=t('resultIdle');
 const factorKeys=[
  ['heat',r.factors.heat,t('heat')],
  ['humidity',r.factors.humidity,t('humidity')],
  ['precip',r.factors.precip,t('precipFactor')],
  ['air',r.factors.air,t('air')],
  ['health',r.factors.health,t('healthFactor')],
  ['vulnerability',r.factors.vulnerability,t('vulnerabilityFactor')],
  ['capacity',r.capacityRisk,t('capacityFactor')+' (risk)']
 ];
 $('factors').innerHTML=factorKeys.map(([k,s,lab])=>'<div class="factor"><span>'+lab+'</span><strong>'+Math.round(s)+'</strong></div>').join('');
 const recs=recommendations(score,v);
 $('recommendations').innerHTML='<h3 id="generalTitle">'+t('general')+'</h3><ul>'+recs.map(x=>'<li>'+x+'</li>').join('')+'</ul>';
 renderConditions(r,v);
 renderVulnerability()
}
function calculateUI(){
 const errors=validate();
 const errEl=$('errors');
 if(errors.length){errEl.innerHTML=errors.map(e=>'<div>'+e+'</div>').join('');errEl.focus();return}
 errEl.textContent='';
 const v={
  temperature:num('temperature'),
  humidity:num('humidity'),
  precip:num('precip'),
  aqi:num('aqi'),
  health:num('health'),
  vulnerability:num('vulnerability'),
  exposure:num('exposure'),
  capacity:num('capacity')
 };
 const r=calculate(v);
 render(r,v)
}
function sample(){
 const today=new Date();
 const from=new Date(today);from.setDate(from.getDate()-6);
 const data={
  location:t('sampleLocation'),
  dateFrom:from.toISOString().slice(0,10),
  dateTo:today.toISOString().slice(0,10),
  temperature:36,humidity:68,precip:12,aqi:145,health:42,vulnerability:38,exposure:3,capacity:55
 };
 Object.entries(data).forEach(([k,v])=>{if($(k))$(k).value=v});
 calculateUI()
}
function reset(){
 fields.concat(['location','dateFrom','dateTo']).forEach(id=>{if($(id))$(id).value=''});
 $('errors').textContent='';
 $('score').textContent='—';
 $('level').textContent=t('waiting');
 $('level').className='level neutral';
 $('summary').textContent=t('resultSummary');
 $('resultSubtitle').textContent=t('resultIdle');
 $('factors').innerHTML='';
 $('conditionsList').innerHTML='<p class="conditions-empty">'+t('conditionsEmpty')+'</p>';
 $('recommendations').innerHTML='<h3 id="generalTitle">'+t('general')+'</h3><p id="generalText">'+t('generalText')+'</p>';
 const panel=$('resultPanel');if(panel)panel.className='panel result';
 const ring=$('scoreRing');if(ring){ring.className='score-ring';ring.style.removeProperty('--score-deg')}
 ['temperatureLevel','humidityLevel','precipLevel','aqiLevel','healthLevel','exposureLevel','capacityLevel'].forEach(id=>{
  if($(id)){$(id).textContent=interpolate(t('indicatorPending'),{label:t(id.replace('Level','').replace('temperature','temperature').replace('humidity','humidity').replace('precip','precip').replace('aqi','air').replace('health','healthFactor').replace('exposure','exposure').replace('capacity','capacity'))});$(id).className='field-level neutral'}
 });
 if($('vulnerabilityLevel')){$('vulnerabilityLevel').textContent=t('vulnPending');$('vulnerabilityLevel').className='field-level neutral'}
}
function applyLanguage(){
 document.documentElement.lang=currentLang;
 document.documentElement.dir=currentLang==='ar'?'rtl':'ltr';
 document.title=t('pageTitle');
 const map={
  brand:'brand',brandSub:'brandSub',eyebrow:'eyebrow',heroTitle:'title',heroIntro:'intro',
  sampleBtn:'sample',resetBtn:'reset',printBtn:'print',privacyTitle:'privacyTitle',privacyText:'privacy',
  dataTitle:'dataTitle',dataHelp:'dataHelp',badge:'badge',locationLabel:'location',dateLabel:'date',dateSep:'dateSep',
  temperatureLabel:'temperature',humidityLabel:'humidity',precipLabel:'precip',aqiLabel:'aqi',healthLabel:'health',
  vulnerabilityLabel:'vulnerability',exposureLabel:'exposure',capacityLabel:'capacity',
  calcBtn:'calc',resultTitle:'resultTitle',resultSubtitle:'resultIdle',level:'waiting',summary:'resultSummary',
  generalTitle:'general',generalText:'generalText',methodologyTitle:'methodology',methodologyHelp:'methodologyHelp',
  formulaBox:'formula',heatWeight:'heat',humidityWeight:'humidity',precipWeight:'precipFactor',airWeight:'air',
  healthWeight:'healthFactor',vulnerabilityWeight:'vulnerabilityFactor',capacityWeight:'capacityFactor',
  methodNote:'note',termsTitle:'termsTitle',termsIntro:'termsIntro',termCol:'termCol',definitionCol:'definitionCol',
  unitCol:'unitCol',ruleCol:'ruleCol',weightCol:'weightCol',guideTitle:'guide',lowLabel:'low',moderateLabel:'moderate',
  highLabel:'high',criticalLabel:'critical',footerText:'footer',conditionsTitle:'conditionsTitle',
  conditionsIntro:'conditionsIntro',conditionsBadge:'conditionsBadge',conditionsEmpty:'conditionsEmpty',
  fieldNote:'fieldNote',checklistTitle:'checklistTitle',checklistIntro:'checklistIntro'
 };
 Object.entries(map).forEach(([id,key])=>{const el=$(id);if(el){if(el.tagName==='INPUT'||el.tagName==='BUTTON'){/*skip value*/}else el.textContent=t(key)}});
 // special for formula which has HTML
 if($('formulaBox'))$('formulaBox').innerHTML='<strong>'+(currentLang==='ar'?'المعادلة:':'Formula:')+'</strong> '+t('formula').replace(/^المعادلة:\s*|^Formula:\s*/,'');
 $('langBtn').textContent=t('langBtn');
 $('location').placeholder=t('locPh');
 $('temperature').placeholder=t('tempPh');
 $('humidity').placeholder=t('humPh');
 if($('precip'))$('precip').placeholder=t('precipPh');
 $('aqi').placeholder=t('aqiPh');
 $('health').placeholder=t('healthPh');
 $('vulnerability').placeholder=t('vulnPh');
 $('exposure').placeholder=t('exposurePh');
 if($('capacity'))$('capacity').placeholder=t('capacityPh');
 renderIndicatorTable();
 renderInputLevels();
 renderVulnerability();
 // reset result texts if idle
 if($('score').textContent==='—'||$('score').textContent===''){
  $('level').textContent=t('waiting');
  $('summary').textContent=t('resultSummary');
  $('resultSubtitle').textContent=t('resultIdle');
  $('conditionsList').innerHTML='<p class="conditions-empty">'+t('conditionsEmpty')+'</p>';
 }
}
function init(){
 applyLanguage();
 $('langBtn').addEventListener('click',()=>{currentLang=currentLang==='ar'?'en':'ar';applyLanguage()});
 $('themeBtn').addEventListener('click',()=>document.body.classList.toggle('dark'));
 $('calcBtn').addEventListener('click',calculateUI);
 $('sampleBtn').addEventListener('click',sample);
 $('resetBtn').addEventListener('click',reset);
 $('printBtn').addEventListener('click',()=>window.print());
 fields.forEach(id=>{const el=$(id);if(el){el.addEventListener('input',()=>{renderInputLevels();if(id==='vulnerability')renderVulnerability()})}});
 if($('vulnerability'))$('vulnerability').addEventListener('input',renderVulnerability);
 renderIndicatorTable()
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
