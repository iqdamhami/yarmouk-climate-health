# Yarmouk Climate & Health Risk Lab v2.2

Local static MVP for an illustrative climate-health risk index.

## v2.2 updates
- Result colors now communicate risk level: green / amber / orange / red.
- Added a dynamic health-condition awareness panel based on heat and AQI indicators.
- Conditions are presented as health conditions that may be affected, not as diagnoses.
- Arabic/English content retained.
- No backend, accounts, database, or centralized data storage.

## Important
The index and condition mapping are an educational/prototype model. They are not a validated clinical score or official warning system. Health information should be reviewed with qualified professionals.


## v2.3 changes
- Added an explicit Population Vulnerability Level linked directly to the entered vulnerability percentage using the same 0–29 / 30–59 / 60–79 / 80–100 bands used by the main index.
- The vulnerability level updates live while entering the value and is reset safely.
- Reset now also restores neutral result styling.
- Hardened `classify()` against non-finite input.
- Existing local-only processing, bilingual UI, validation, print/PDF, theme, sample, and condition guidance were preserved.

## v2.4 changes
- Added live semantic level indicators for Air Quality (AQI), Health Indicator, and Exposure Duration, matching their normalized 0–100 index values to the same Low / Moderate / High / Very High bands.
- Exposure level uses the same 0–7 day capped exposure scale that affects the composite score; values above 7 days remain at the maximum exposure contribution.
- Added accessible `aria-describedby` links for the three live level indicators.
- Preserved the existing Population Vulnerability Level behavior.
- Added regression coverage for exposure normalization and retained the existing validation, calculation, classification, condition, theme, language, sample, reset, and print workflows.


## v2.5 changes
- Added an in-page environmental glossary and indicator table under “How is the index calculated?” in Arabic and English.
- The table documents definitions, units/ranges, exact transformation rules, and weights for temperature, relative humidity, AQI, health indicator, population vulnerability, exposure duration, heat stress, exposure, vulnerability, and the composite index.
- Added an explicit formula showing the weighted base score and the capped exposure multiplier.
- Added live semantic levels for temperature and relative humidity, in addition to the existing AQI, health, vulnerability, and exposure indicators.
- Corrected the bilingual `0–100` badge translation.
- Removed the fallback that displayed a respiratory condition solely because the composite score was moderate or higher; health-condition awareness now requires heat/air/exposure triggers.
- Preserved the local-only architecture, validation, bilingual UI, theme, sample, reset, print/PDF, and calculation behavior.
- Added regression tests for weight integrity, exposure capping, and condition-trigger behavior.

## Review notes
The software workflow and calculations were reviewed as implemented in this static MVP. Automated regression tests pass. The model remains illustrative: its normalization thresholds, weights, health-rate scale, and condition triggers are not presented as official environmental or clinical standards and should be externally validated before operational or research use.
