# Yarmouk Climate & Health Risk Lab v2.6

Local static MVP for an illustrative climate-health risk index, aligned with the multi-country Climate-Related Health Vulnerability & Emergency Preparedness Assessment data collection checklist.

## v2.6 updates
- Date field changed to a time period (from date – to date).
- Assessment data fields expanded and aligned with the Excel data collection checklist:
  - Population vulnerability (children <5, older adults, pregnant women, refugees/IDPs, outdoor workers, chronic conditions)
  - Climate: temperature, humidity, precipitation (extremes for flood/drought risk)
  - Air quality (AQI / PM2.5)
  - Climate-sensitive health outcomes (heat, respiratory, diarrheal, vector-borne, nutrition, mental, occupational)
  - Health system capacity / preparedness (facilities, workforce, alert systems, plans)
- Calculation model updated: weights include precipitation and protective system capacity; exposure multiplier retained.
- New health-condition triggers for diarrheal and vector-borne diseases linked to precipitation extremes.
- Added checklist reference section mapping model inputs to checklist categories 1–26.
- Bilingual (Arabic/English) content retained and expanded.
- No backend, accounts, database, or centralized data storage.

## Countries / context
Jordan (primary), Tunisia, Algeria, Lebanon, Yemen, UAE — consistent with the attached data availability & collection checklist.

## Important
The index and condition mapping are an educational/prototype model. They are not a validated clinical score or official warning system. Health information should be reviewed with qualified professionals. Weights, thresholds and transformations should be calibrated against local data and GBD / national burden estimates before operational use.

## Prior versions
See changelog notes in previous README versions (v2.2–v2.5) for colour semantics, live levels, glossary table, exposure capping, and condition-trigger behaviour.
