# Microsoft Forms Blueprint: Martha's Rule Call Visit Log

Purpose: capture the post-review / visit-log information after a Martha's Rule call. The form is designed to be easy to complete and Excel-friendly, with each item captured as a separate question wherever possible.

Recommended form title:
Martha's Rule Call Visit Log

Recommended form description:
Use this form to document the clinical review, actions, outcomes, learning and notification details following a Martha's Rule call. Managers and matrons are included as default notification recipients. Enter any additional notification recipient NHS emails separately.

## Section 1: Attendance and Clinical Assessment

| Question | Type | Required | Notes / App Mapping |
| --- | --- | --- | --- |
| MRN number | Text | Yes | `patient.mrn` |
| Ethnic group | Text | No | `patient.ethnicGroup`; free text to keep form simple |
| Date of visit | Date | Yes | `visitLog.dateOfVisit` |
| Time of PERRT/Outreach attendance | Text | No | `visitLog.timeOfAttendance`; use HH:MM if known |
| NEWS2 score at time of call | Text | Yes | `visitLog.clinicalAssessment.news2AtCall` |
| NEWS2 score at time of attendance | Text | Yes | `visitLog.clinicalAssessment.news2AtAttendance` |
| Additional clinical notes | Long text | No | `visitLog.clinicalAssessment.additionalClinicalNotes` |

## Section 2: Actions and Outcomes

| Question | Type | Required | Notes / App Mapping |
| --- | --- | --- | --- |
| PERRT actions taken | Long text | Yes | `visitLog.actionsOutcomes.perrtActionsTaken`; free text, can contain multiple actions |
| Total time spent managing concern [hours] | Text | Yes | `visitLog.actionsOutcomes.totalTimeSpent` |
| Outcome of call | Long text | Yes | `visitLog.actionsOutcomes.outcomes`; free text, can contain multiple outcomes |

## Section 3: Call Category

| Question | Type | Required | Notes / App Mapping |
| --- | --- | --- | --- |
| Do you need to re-categorise this call? | Choice: Yes / No | Yes | `visitLog.recategoriseCall` |
| Re-categorised urgency category | Text | Conditional if Yes | `activeFormUrgency`; e.g. U1 Emergent, U2 Urgent |
| Category of call detail | Long text | Conditional if Yes | `categoryOfCallLabel`; includes acute deterioration and warning-sign detail |
| Core concern | Text | Conditional if Yes | `visitLog.callCategory.coreConcern` label |
| Secondary concern | Long text | Conditional if Yes | `visitLog.callCategory.secondaryFactors` labels |
| Has the caller spoken to the ward? | Text | Conditional if Yes | `visitLog.callCategory.wardContact` label |

## Section 4: Learning and Notifications

| Question | Type | Required | Notes / App Mapping |
| --- | --- | --- | --- |
| Learning identified? | Choice: Yes / No / Pending | Yes | `visitLog.actionsOutcomes.learningIdentified` |
| Learning theme | Text | Conditional if Yes or Pending | `visitLog.actionsOutcomes.learningTheme` |
| Feedback / learning notes | Long text | Conditional if Yes or Pending | `visitLog.actionsOutcomes.feedbackLearningNotes` |
| Default notification recipients | Text | No | Pre-filled/static answer: Managers; Matrons |
| Additional notification recipient NHS email(s) | Text | No | `visitLog.notifications.otherEmails`; multiple emails separated by semicolon |

## Section 5: Review / Submission Metadata

| Question | Type | Required | Notes / App Mapping |
| --- | --- | --- | --- |
| Form submitter name | Text | No | Can be manually entered or pre-filled by app as "Generated from triage app" |
| Date submitted | Date | No | Optional; Microsoft Forms also captures submission timestamp |
| Additional comments | Long text | No | Optional free-text catch-all |

## Excel-Friendly Notes

- Keep question titles stable after publishing, because exported Excel columns use these labels.
- For multiple values in a free-text field, separate entries with semicolons where possible.
- Additional notification emails should use semicolons, for example: `name@nhs.net; name2@nhs.net`.
- If recategorisation is "No", the category detail fields can remain blank.
- If recategorisation is "Yes", complete the separate category fields so they can be filtered independently in Excel.

## Suggested Required Fields

Minimum required fields:

- MRN number
- Date of visit
- NEWS2 score at time of call
- NEWS2 score at time of attendance
- PERRT actions taken
- Total time spent managing concern [hours]
- Outcome of call
- Do you need to re-categorise this call?
- Learning identified?

Conditional required fields:

- Re-categorised urgency category, category detail, core concern and secondary concern if recategorisation is Yes.
- Learning theme and feedback / learning notes if learning is Yes or Pending.
