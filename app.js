const STORAGE_KEY = "marthas-rule-call-triage-log-v1";
const THEME_STORAGE_KEY = "marthas-rule-theme";
const MAIN_PERRT_EMAIL = "uclh.perrtuch2@nhs.net";
const TRIAGE_MICROSOFT_FORM_BASE = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=slTDN7CF9UeyIge0jXdO49GaBrN0vZFAnRn9_VIFc8RUOVQ3TDJFMFZEWllINERCQzNHSlNJNlhLNi4u";
const REPEAT_CALL_MICROSOFT_FORM_BASE = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=slTDN7CF9UeyIge0jXdO49GaBrN0vZFAnRn9_VIFc8RURFg5WVk5V1BCUU1NQlM5Tk4zWEtMNThTWC4u";
const VISIT_LOG_MICROSOFT_FORM_BASE = "https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=slTDN7CF9UeyIge0jXdO49GaBrN0vZFAnRn9_VIFc8RURDlSUkpCSEYxUlFETTYyVFBDVVVXMklYNC4u";
const APP_VERSION = "20260521-0001";
const VISIT_LOG_CASE_CODE_QUERY_PARAM = "caseCode";
const VISIT_LOG_CASE_CODE_MICROSOFT_FORM_FIELD = "r8c81605c8305469ba29b465b9a5d79f1";
const VISIT_LOG_PREFILL_QUERY_PARAMS = {
  mrn: ["mrn", "MRN"],
  wardArea: ["visitWardArea", "wardArea", "ward"],
  wardAreaOther: ["visitWardAreaOther", "wardAreaOther", "otherWard"],
  bedNumber: ["visitBedNumber", "bedNumber", "bed"],
  triageCategory: ["triageCategory", "category", "urgency"],
  primaryConcern: ["primaryConcern", "primary"],
  secondaryConcern: ["secondaryConcern", "secondary"],
  callerConcernSummary: ["callerConcernSummary", "concernSummary", "summary"],
};
const FREE_TEXT_LIMIT = 500;
const noticeRecipientOptions = [
  ["jermyn.congzon@nhs.net", "Jermyn Congzon", "Interface developer", "", "tech"],
  ["e.strickland@nhs.net", "Ellen Strickland", "Senior Project Manager", "", "tech"],
  ["perrt.administrator@nhs.net", "PERRT Administrator", "PERRT admin", "", "tech"],
  ["jillian.hartin@nhs.net", "Jillian Hartin", "PERRT lead", "", "lead"],
  ["uclh.PERRTband8@nhs.net", "PERRT Band 8 mailbox", "Band 8 senior nurses", "", "senior"],
  ["passang.pangri@nhs.net", "Passang Pangri", "Senior Nurse PERRT", "", "senior"],
  ["ben.beaman@nhs.net", "Ben Beaman", "Senior Nurse PERRT", "", "senior"],
  ["bernardo.hernandez@nhs.net", "Bernardo Hernandez", "Senior Nurse PERRT", "", "senior"],
  ["eldaissa.perez@nhs.net", "Elda Issa Perez", "Senior Nurse PERRT", "", "senior"],
  ["lily.capilli@nhs.net", "Lily Capilli", "Senior Nurse PERRT", "", "senior"],
  ["alistair.sim@nhs.net", "Alistair Sim", "NHNN senior nurse outreach", "", "senior"],
  ["daniel.antunes@nhs.net", "Daniel Antunes", "PERRT nurse", "", "nurse"],
  ["adrian.ballester@nhs.net", "Adrian Ballester", "PERRT nurse", "", "nurse"],
  ["fatima.bolon-rodriguez@nhs.net", "Fatima Bolon-Rodriguez", "PERRT nurse", "", "nurse"],
  ["jennifer.burnand@nhs.net", "Jennifer Burnand", "PERRT nurse", "", "nurse"],
  ["h.cross8@nhs.net", "Hannah Cross", "PERRT nurse", "", "nurse"],
  ["rachelwilson5@nhs.net", "Rachel Wilson", "PERRT nurse", "", "nurse"],
  ["stella.osei@nhs.net", "Stella Osei", "PERRT nurse", "", "nurse"],
  ["danny.kerrigan@nhs.net", "Danny Kerrigan", "PERRT nurse", "", "nurse"],
  ["l.jane@nhs.net", "Lisa Jane", "PERRT nurse", "", "nurse"],
  ["grace.jackson6@nhs.net", "Grace Jackson", "PERRT nurse", "", "nurse"],
  ["samantha.follett@nhs.net", "Samantha Follett", "PERRT nurse", "", "nurse"],
  ["s.donaldson2@nhs.net", "Sophie Donaldson", "PERRT nurse", "", "nurse"],
  ["n.fidan@nhs.net", "Natalia Fidan", "PERRT nurse", "", "nurse"],
  ["aoife.mccarthy5@nhs.net", "Aoife McCarthy", "PERRT nurse", "", "nurse"],
  ["dominic.mcgrath@nhs.net", "Dominic McGrath", "PERRT nurse", "", "nurse"],
  ["thara.mubarak@nhs.net", "Thara Mubarak", "PERRT nurse", "", "nurse"],
  ["alexander.seager3@nhs.net", "Alexander Seager", "PERRT nurse", "", "nurse"],
  ["claire.hayzelden2@nhs.net", "Claire Hayzelden", "PERRT nurse", "", "nurse"],
  ["duncan.smith1@nhs.net", "Duncan Smith", "PERRT nurse", "", "nurse"],
  ["amy.silver2@nhs.net", "Amy Silver", "Senior Nurse PERRT - maternity leave", "unavailable", "senior"],
  ["m.tipler@nhs.net", "Michael Tipler", "PERRT nurse", "", "nurse"],
  ["elizabethrachel.tomlinson@nhs.net", "Elizabeth Rachel Tomlinson", "PERRT nurse", "", "nurse"],
  ["riccardo.zappi@nhs.net", "Riccardo Zappi", "PERRT nurse", "", "nurse"],
  ["adelina.fino@nhs.net", "Adelina Fino", "NHNN Outreach", "", "nhnn"],
  ["carla.pacheco@nhs.net", "Carla Pacheco", "NHNN Outreach", "", "nhnn"],
  ["catherine.groves@nhs.net", "Catherine Groves", "NHNN Outreach", "", "nhnn"],
  ["katie.bulpett@nhs.net", "Katie Bulpett", "NHNN Outreach", "", "nhnn"],
];

const noticeRecipientGroups = [
  { key: "tech", title: "Tech, project and admin", tone: "blue" },
  { key: "lead", title: "PERRT lead", tone: "green" },
  { key: "senior", title: "Senior nurses", tone: "purple" },
  { key: "nurse", title: "PERRT nurses", tone: "orange" },
  { key: "nhnn", title: "NHNN Outreach", tone: "cyan" },
];

const defaultState = {
  currentStep: 0,
  currentVisitStep: 0,
  generatedSummary: "",
  generatedSummaryHtml: "",
  generatedEmailHtml: "",
  callDetails: {
    dateOfReferral: "",
    timePhoneAnswered: "",
    delayInAnswering: "",
    repeatCall: "",
  },
  caller: {
    callerType: "",
  },
  triage: {
    acuteDeterioration: "",
    redFlags: [],
    otherRedFlagText: "",
    coreConcern: "",
    sameDayReview: "",
    secondaryFactors: [],
    genuineWorry: "",
    wardContact: "",
    noticeRecipients: [],
  },
  concernSummary: {
    mostWorried: "",
    alreadyTried: "",
    unresolved: "",
    concernsSummary: "",
  },
  patient: {
    mrn: "",
    dob: "",
    gender: "",
    ethnicGroup: "",
    learningDisabilityNeurodiversity: "",
  },
  location: {
    wardArea: "",
    wardAreaOther: "",
    otherWardRecipientEmails: "",
    bedNumber: "",
    specialtyMedicalTeam: "",
  },
  repeatCallUpdate: {
    mrn: "",
    wardArea: "",
    wardAreaOther: "",
    otherWardRecipientEmails: "",
    bedNumber: "",
    sameConcern: "",
    additionalInformation: "",
    triageMethod: "",
    directTriageCode: "",
  },
  visitLog: {
    recategoriseCall: "",
    location: {
      wardArea: "",
      wardAreaOther: "",
      bedNumber: "",
    },
    callCategory: {
      acuteDeterioration: "",
      redFlags: [],
      otherRedFlagText: "",
      coreConcern: "",
      sameDayReview: "",
      secondaryFactors: [],
      genuineWorry: "",
      wardContact: "",
    },
    dateOfVisit: "",
    timeOfAttendance: "",
    clinicalAssessment: {
      caseCode: "",
      news2AtCall: "",
      news2AtAttendance: "",
      additionalClinicalNotes: "",
    },
    actionsOutcomes: {
      perrtActionsTaken: [],
      totalTimeSpent: "",
      outcomes: [],
      learningIdentified: "",
      learningTheme: "",
      feedbackLearningNotes: "",
    },
    notifications: {
      recipients: [],
      otherEmails: "",
    },
    handover: {
      active: false,
      triageCategory: "",
      primaryConcern: "",
      secondaryConcern: "",
      callerConcernSummary: "",
    },
  },
};

let state = clone(defaultState);
const app = document.querySelector("#app");
let activeTab = "triage";
let urgencyGuideOpen = false;
let selectedUrgencyGuide = "";
let liveMapMinimized = false;
let selectedConcernHelp = "";
let emailPreviewOpen = false;
let appModeSelected = false;
let summaryCollapsed = true;
let epicSummaryCollapsed = true;
let processPosterOpen = false;
let darkModeEnabled = false;
let autoFillMenuOpen = false;
let pendingTriageQuestionCenter = false;
let wardContactModalOpen = false;
let otherWardEmailModalOpen = false;
let otherWardEmailOpenFormAfterSave = false;
let noticeRecipientModalOpen = false;
let pendingNoticeRecipientScrollTop = null;
let noticeDispatchAnimationVisible = false;
let noticeDispatchAnimationTimeout = null;
let noticeRecipientRevealTimeout = null;
let handoverWindowPosition = { x: null, y: null };
let handoverDragState = null;
let handoverWindowMinimized = false;
let handoverSuppressNextToggle = false;
let suppressNextRenderAnimations = false;

const triageSteps = [
  { id: "callDetails", title: "Call Details and Timing", render: renderCallDetailsSection },
  { id: "patient", title: "Patient Demographic", render: renderPatientSection },
  { id: "location", title: "Location and Clinical Context", render: renderLocationSection },
  { id: "caller", title: "Caller and Call Context", render: renderCallerSection },
  { id: "triage", title: "Triage", render: renderTriageSection },
  { id: "concernSummary", title: "Caller Concern Summary", render: renderConcernSummarySection },
  { id: "triageRouteAction", title: "Triage Route and Action", render: renderTriageRouteActionSection },
];

const repeatSteps = [
  { id: "callDetails", title: "Call Details and Timing", render: renderCallDetailsSection },
  { id: "repeatCallUpdate", title: "Repeat Call Update", render: renderRepeatCallSection },
  { id: "triage", title: "Repeat Call Triage", render: renderTriageSection },
  { id: "repeatContactReason", title: "Reason for Repeat Contact", render: renderRepeatContactReasonSection },
];

const visitLogSteps = [
  { id: "clinicalAssessment", title: "Attendance and Clinical Assessment", render: renderVisitLogClinicalAssessmentSection },
  { id: "actionsOutcomes", title: "Actions and Outcomes", render: renderVisitLogActionsOutcomesSection },
  { id: "callCategory", title: "Call Category", render: renderVisitLogCallCategorySection },
  { id: "learningNotifications", title: "Learning and Notifications", render: renderVisitLogLearningNotificationsSection },
  { id: "visitLogActions", title: "Review and Submit", render: renderVisitLogReviewSection },
];

const coreConcernGroups = {
  symptom_related: {
    label: "Symptom-related concern",
    options: {
      pain: "Pain",
      infection_sepsis: "Infection / sepsis-related concern",
      neuro_confusion_delirium: "Neuro / confusion / delirium-related concern",
      other_symptom: "Other symptom-related concern",
    },
  },
  treatment_related: {
    label: "Treatment-related issue",
    options: {
      medication: "Medication-related issue",
      surgical_intervention: "Surgical intervention-related issue",
      nursing_intervention: "Nursing intervention-related issue",
      other_treatment: "Other treatment-related issue",
    },
  },
  medical_equipment_device: {
    label: "Medical equipment / device-related issue",
    options: {
      medical_device: "Medical equipment / device concern",
    },
  },
  discharge_related: {
    label: "Discharge-related concern",
    options: {
      discharge_aftercare: "Discharge / aftercare concern",
    },
  },
  service_related_non_clinical: {
    label: "Service-related non-clinical issue",
    options: {
      service_access_admin_environment: "Access / administrative / environment / practical issue",
    },
  },
  other_unclear: {
    label: "Other / not sure",
    options: {
      other_unclear: "Other / not sure",
    },
  },
};

const secondaryConcernGroups = {
  information_communication: {
    label: "Information / communication-related concern",
    options: {
      awaiting_update_inadequate_update: "Caller is awaiting an update or feels the update was inadequate",
      unclear_confusing_conflicting_information: "Caller finds care information unclear, confusing or conflicting",
      unable_access_right_team_person: "Caller cannot access the right team or person",
    },
  },
  interaction_related: {
    label: "Interaction-related concern",
    options: {
      not_listened_to_not_taken_seriously: "Caller feels not listened to or not taken seriously",
      unmet_expectations_disagreement_plan: "Caller disagrees with, or has unmet expectations about, the care plan",
      negative_interaction_with_staff: "Caller describes a negative interaction with staff",
    },
  },
  response_related: {
    label: "Response-related concern",
    options: {
      raised_but_unresolved: "Caller has already raised the concern but feels it remains unresolved",
      delay_in_response_or_action: "Caller is concerned about a delay in response or action",
    },
  },
};

const concernHelpDetails = {
  pain: {
    title: "Pain",
    useWhen: "New, worsening, uncontrolled or persistent pain, where the main issue is the symptom itself.",
    example: "The patient is still in pain.",
  },
  infection_sepsis: {
    title: "Infection / sepsis-related concern",
    useWhen: "Fever, feeling septic, possible infection, post-operative infection concern, wound infection concern, or worry about sepsis.",
    example: "They are feverish and have had sepsis before.",
  },
  neuro_confusion_delirium: {
    title: "Neuro / confusion / delirium-related concern",
    useWhen: "Confusion, delirium, drowsiness, reduced alertness, seizure concern, or neurological change.",
    example: "The patient is more confused than usual.",
  },
  other_symptom: {
    title: "Other symptom-related concern",
    useWhen: "Other reported symptoms that do not fit pain, infection/sepsis, or neuro/confusion/delirium.",
    example: "The patient is vomiting and feels unwell.",
  },
  medication: {
    title: "Medication-related issue",
    useWhen: "Medication delay, missed medication, incorrect prescription, medication route issue, unclear medication plan, or medication-related safety concern.",
    example: "Pain relief has not been prescribed.",
  },
  surgical_intervention: {
    title: "Surgical intervention-related issue",
    useWhen: "Surgery, post-operative plan, surgical review, need for an operation/procedure, or concern about surgical decision-making.",
    example: "They are waiting for the surgical team to review.",
  },
  nursing_intervention: {
    title: "Nursing intervention-related issue",
    useWhen: "Nursing care actions not completed or not meeting expectations, such as hygiene, repositioning, basic care, mouth care, fluid support or observations.",
    example: "The patient has not been helped with personal care.",
  },
  other_treatment: {
    title: "Other treatment-related issue",
    useWhen: "Physiotherapy, dietetics, therapy input, medical review, investigations, or other clinical interventions.",
    example: "They are waiting for a scan/result/review.",
  },
  medical_device: {
    title: "Medical equipment / device concern",
    useWhen: "Feeding tubes, drains, lines, catheters, pumps, beds, equipment, or device-related care concerns.",
    example: "There is an issue with the feeding tube.",
  },
  discharge_aftercare: {
    title: "Discharge / aftercare concern",
    useWhen: "Discharge planning, aftercare, follow-up arrangements, transport, community support, delayed discharge or unclear discharge plan.",
    example: "They do not understand the discharge plan.",
  },
  service_access_admin_environment: {
    title: "Access / administrative / environment / practical issue",
    useWhen: "Non-clinical service issues, access problems, belongings, cleanliness, environment, ward access, secretary/team contact route, or practical concerns.",
    example: "The family cannot get through to the ward.",
  },
  other_unclear: {
    title: "Other / not sure",
    useWhen: "The concern does not clearly fit any category, or the narrative is too limited to classify safely.",
    example: "The family has a complaint about care.",
  },
  awaiting_update_inadequate_update: {
    title: "Caller is awaiting an update or feels the update was inadequate",
    useWhen: "Use when the caller or patient has not received enough information, is still waiting for an update, or feels the update given was insufficient.",
    example: "They are still waiting to hear from the team.",
  },
  unclear_confusing_conflicting_information: {
    title: "Caller finds care information unclear, confusing or conflicting",
    useWhen: "Use when the caller or patient finds information about the patient's care unclear, inconsistent, confusing, contradictory, or different from what they understood previously.",
    example: "They were told different things by different people.",
  },
  unable_access_right_team_person: {
    title: "Caller cannot access the right team or person",
    useWhen: "Use when the caller or patient is trying to reach the ward, secretary, consultant, medical team or specialist team to obtain information or clarification, but cannot get through.",
    example: "They wanted to speak to the consultant's secretary.",
  },
  not_listened_to_not_taken_seriously: {
    title: "Caller feels not listened to or not taken seriously",
    useWhen: "Use when the caller or patient has spoken to staff but feels dismissed, unheard, minimised, ignored, or not taken seriously.",
    example: "They felt nobody was listening.",
  },
  unmet_expectations_disagreement_plan: {
    title: "Caller disagrees with, or has unmet expectations about, the care plan",
    useWhen: "Use when the caller or patient disagrees with the current plan or there is a mismatch between what they expect and what the team is advising.",
    example: "They do not agree with the plan.",
  },
  negative_interaction_with_staff: {
    title: "Caller describes a negative interaction with staff",
    useWhen: "Use when the caller or patient describes an upsetting, insensitive, dismissive, blaming, abrupt or otherwise negative interaction.",
    example: "The patient felt blamed for being in hospital.",
  },
  raised_but_unresolved: {
    title: "Caller has already raised the concern but feels it remains unresolved",
    useWhen: "Use when the same issue has already been raised, but the caller or patient feels it has not been resolved.",
    example: "They have already told the ward but nothing has changed.",
  },
  delay_in_response_or_action: {
    title: "Caller is concerned about a delay in response or action",
    useWhen: "Use when the caller or patient is concerned about a delay in review, medication, treatment, investigation, escalation, or staff action after the concern has been raised.",
    example: "They are still waiting for the pain team.",
  },
};

const coreConcernOptions = groupedOptions(coreConcernGroups);
const secondaryFactorOptions = groupedOptions(secondaryConcernGroups);
const coreConcernLabels = optionLabelMap(coreConcernOptions);
const clinicalCoreConcerns = coreConcernOptions
  .map(([value]) => value)
  .filter((value) => value !== "service_access_admin_environment" && value !== "other_unclear");
const serviceCoreConcerns = ["service_access_admin_environment"];

const genderOptions = [
  ["Male (including trans man)", "Male (including trans man)"],
  ["Female (including trans woman)", "Female (including trans woman)"],
  ["Not Stated", "Not Stated"],
  ["Others (not listed)", "Others (not listed)"],
  ["Non-binary", "Non-binary"],
];

const ethnicGroupOptions = [
  ["White - British", "White - British"],
  ["White - Irish", "White - Irish"],
  ["White - Any other White background", "White - Any other White background"],
  ["Mixed - White and Black Caribbean", "Mixed - White and Black Caribbean"],
  ["Mixed - White and Black African", "Mixed - White and Black African"],
  ["Mixed - White and Asian", "Mixed - White and Asian"],
  ["Mixed - Any other mixed background", "Mixed - Any other mixed background"],
  ["Asian or Asian British - Indian", "Asian or Asian British - Indian"],
  ["Asian or Asian British - Pakistani", "Asian or Asian British - Pakistani"],
  ["Asian or Asian British - Bangladeshi", "Asian or Asian British - Bangladeshi"],
  ["Asian or Asian British - Any other Asian background", "Asian or Asian British - Any other Asian background"],
  ["Black or Black British - Caribbean", "Black or Black British - Caribbean"],
  ["Black or Black British - African", "Black or Black British - African"],
  ["Black or Black British - Any other Black background", "Black or Black British - Any other Black background"],
  ["Other Ethnic Groups - Chinese", "Other Ethnic Groups - Chinese"],
  ["Other Ethnic Groups - Any other ethnic group", "Other Ethnic Groups - Any other ethnic group"],
  ["Not stated", "Not stated"],
  ["Not known", "Not known"],
];

const wardAreaSuggestions = [
  "EGA 2nd Floor Neonatal Unit",
  "EGA Early Pregnancy Unit",
  "EGA Lower Ground Paediatric Outpatients",
  "EGA Lower Ground Urogynaecology",
  "GWB 1st Floor Grafton Way Elective Orthopaedics",
  "GWB 2nd Floor East Haematology",
  "GWB 2nd Floor North Haematology",
  "GWB 3rd Floor East Haematology",
  "GWB 3rd Floor North Haematology",
  "GWB 4th Floor East Wing 250 Euston Rd Haematology",
  "UCH Tower GF Emergency Department",
  "UCH Tower GF Same Day Emergency Care (SDEC)",
  "UCH Tower GF Paediatric ED",
  "UCH Tower 1F Acute Medical Unit (AMU)",
  "UCH T3 ITU",
  "UCH T6 South PACU",
  "UCH T6 Central & North Clinical Pharmacology",
  "UCH T07 N Care of the Elderly",
  "UCH T07 S Care of the Elderly",
  "UCH T8 Infectious Diseases",
  "UCH T9 Central",
  "UCH T9 North",
  "UCH T9 South",
  "UCH T10 N",
  "UCH T10 S",
  "UCH T11",
  "UCH T12",
  "UCH T13 Oncology",
  "UCH T14 North Head & Neck Ward",
  "UCH T14 Women's Health",
  "UCH T16 Haematology",
  "WMS Ground Floor Urology Pre-assessment & Outpatients",
  "WMS 1F ITU WMS",
  "WMS 2F Urology Short Stay / Gynae Reception",
  "WMS 3F Urology Long Stay",
  "WMS 4F Thoracics",
  "NHNN LAA",
  "NHNN BS",
  "NHNN MLFU",
  "NHNN VH",
  "NHNN JY",
  "NHNN JTTU",
  "NHNN DF",
  "NHNN Bloomsbury Ward",
  "NHNN Rehab",
  "Test",
  "Other",
];

const wardAreaOptions = wardAreaSuggestions.map((wardArea) => [wardArea, wardArea]);

let wardContactDirectory = Object.fromEntries(
  wardAreaSuggestions.map((wardArea) => [
    wardArea,
    [],
  ])
);

const specialtyOptions = [
  ["General Medicine", "General Medicine"],
  ["Surgery", "Surgery"],
  ["Haematology", "Haematology"],
  ["Neurology", "Neurology"],
  ["Cardiology", "Cardiology"],
  ["Oncology", "Oncology"],
  ["ICU", "ICU"],
  ["Theatres", "Theatres"],
  ["Paediatrics", "Paediatrics"],
  ["Neurosurgery", "Neurosurgery"],
  ["Other", "Other"],
];

const callerTypeOptions = [
  ["staff", "Staff"],
  ["patient", "Patient"],
  ["family_carer", "Family/Carer"],
  ["other", "Other"],
];

const formIssueOptions = [
  ["Medication issue or delay", "Medication issue or delay"],
  ["Delayed investigations", "Delayed investigations"],
  ["Clinical concern/management of a long term condition", "Clinical concern/management of a long term condition"],
  ["Discharge planning", "Discharge planning"],
  ["Communication issue", "Communication issue"],
  ["Non-clinical concern", "Non-clinical concern"],
  ["signpost to another clinical service or team", "signpost to another clinical service or team"],
];

const urgencyLabels = {
  U1_immediate_emergency: "U1 - Emergent",
  U2_same_day_clinical: "U2 - Urgent clinical",
  U3_routine_clinical: "U3 - Routine clinical",
  U4_service_or_admin: "U4 - Service or admin",
  U5_unclear_or_insufficient_info: "U5 - Unclear or insufficient information",
};

const repeatTriageCodeOptions = Object.entries(urgencyLabels);

const urgencyGuideDetails = {
  U1_immediate_emergency: {
    code: "U1",
    label: "Emergent",
    useWhen: "There is an acute deterioration concern with clear red flags, such as severe breathlessness, chest pain, collapse, seizure, active bleeding, possible sepsis with deterioration, sudden confusion, reduced consciousness, or rapid worsening.",
    route: "PERRT/Outreach review",
  },
  U2_same_day_clinical: {
    code: "U2",
    label: "Urgent clinical",
    useWhen: "The concern is clinically important and may need urgent clarification, review, escalation or senior decision-making, but is not being treated as an immediate emergency.",
    route: "PERRT/Outreach review",
  },
  U3_routine_clinical: {
    code: "U3",
    label: "Routine clinical",
    useWhen: "The concern is clinical but appears suitable for ward or team follow-up.",
    route: "Local ward/team follow-up",
  },
  U4_service_or_admin: {
    code: "U4",
    label: "Service or admin",
    useWhen: "The concern is mainly non-clinical, practical, access-related, administrative, environmental or service recovery related.",
    route: "Local ward/team service recovery",
  },
  U5_unclear_or_insufficient_info: {
    code: "U5",
    label: "Unclear or insufficient information",
    useWhen: "The available information is too broad, vague or incomplete to classify safely.",
    route: "Local ward/team manual review",
  },
};

const triageProcessGuideDetail = {
  code: "Triage",
  label: "Primary and secondary concern process",
  useWhen: "Start by checking whether there is acute deterioration or any warning sign. If there are clear red flags, treat as U1. If not, code the primary concern as what the call is mainly about.",
  route: "Then code the secondary concern as why the issue escalated to Martha's Rule, such as poor or unclear information, difficulty accessing the right person, feeling dismissed, delay, unresolved concerns, or worry about deterioration.",
};

const redFlagOptions = [
  ["breathing", "Breathing difficulty / severe breathlessness"],
  ["chest_pain", "Chest pain / cardiovascular concern"],
  ["neuro", "Seizure / collapse / reduced consciousness / sudden confusion"],
  ["bleeding", "Active bleeding / blood loss"],
  ["sepsis", "Fever / rigors / possible sepsis with deterioration"],
  ["rapid", "Rapid worsening"],
  ["other", "Other warning sign"],
  ["none", "No warning signs"],
];

const perrtActionOptions = [
  ["transfer_higher_acuity", "Transfer to higher acuity area like ICU/ECU"],
  ["phone_advice_only", "Phone advice only"],
  ["safety_netting", "Safety netting"],
  ["clinical_review_suggestions", "Clinical review & suggestions"],
  ["other", "Other"],
];

const outcomeOptions = [
  ["Remained on PERRT/Outreach list for follow-up", "Remained on PERRT/Outreach list for follow-up"],
  ["Discharged from PERRT/Outreach list", "Discharged from PERRT/Outreach list"],
  ["Escalated to medical team", "Escalated to medical team"],
  ["Transfer to ITU/HDU", "Transfer to ITU/HDU"],
  ["Transferred to enhance level", "Transferred to enhance level"],
  ["Transferred to tertiary care (on or off site)", "Transferred to tertiary care (on or off site)"],
  ["End of life pathway initiated or upheld (not for Critical Care)", "End of life pathway initiated or upheld (not for Critical Care)"],
  ["Other", "Other"],
];

const learningThemeOptions = [
  ["Communication", "Communication"],
  ["Escalation", "Escalation"],
  ["Handover", "Handover"],
  ["Delay", "Delay"],
  ["Teamwork", "Teamwork"],
  ["Other", "Other"],
];

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function groupedOptions(groups) {
  return Object.values(groups).flatMap((group) => Object.entries(group.options));
}

function optionLabelMap(options) {
  return Object.fromEntries(options);
}

function getPath(path) {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), state);
}

function setPath(path, value) {
  const keys = path.split(".");
  let target = state;
  keys.slice(0, -1).forEach((key) => {
    target = target[key];
  });
  target[keys[keys.length - 1]] = value;
}

function optionLabel(options, value) {
  const found = options.find(([key]) => key === value);
  return found ? found[1] : value;
}

function listLabels(options, values) {
  const selected = values || [];
  if (!selected.length) return "None selected";
  return selected.map((value) => optionLabel(options, value)).join(", ");
}

function isRepeatOnlyMode() {
  return state.callDetails.repeatCall === "yes";
}

function getSteps() {
  if (!isRepeatOnlyMode()) return triageSteps;
  return [
    ...repeatSteps,
    { id: "triageRouteAction", title: "Repeat Call Triage Route and Action", render: renderTriageRouteActionSection },
  ];
}

function normalizeCurrentStep() {
  const steps = getSteps();
  if (state.currentStep >= steps.length) state.currentStep = steps.length - 1;
  if (state.currentStep < 0) state.currentStep = 0;
  if (isRepeatOnlyMode() && state.currentStep > 1 && !repeatCallUpdateIsComplete()) {
    state.currentStep = 1;
  }
  if (state.currentVisitStep >= visitLogSteps.length) state.currentVisitStep = visitLogSteps.length - 1;
  if (state.currentVisitStep < 0) state.currentVisitStep = 0;
}

function renderApp() {
  if (!appModeSelected) {
    app.innerHTML = renderStartView();
    return;
  }

  normalizeCurrentStep();
  const steps = getSteps();
  const current = steps[state.currentStep];
  const quietRenderClass = suppressNextRenderAnimations ? " quiet-render" : "";
  suppressNextRenderAnimations = false;

  app.innerHTML = `
    <div class="shell${quietRenderClass}">
      ${renderHeader()}
      ${renderTabs()}
      ${activeTab === "visitLog" ? renderVisitLogTab() : `
      <div class="layout">
        <section class="workflow">
          <div class="tabbed-stage">
            ${renderCallTriageStepOverview()}
            ${renderWorkflow(current)}
          </div>
        </section>
      </div>
      <div class="floating-live-map">
        ${renderLiveTriageMap()}
      </div>
      `}
      ${renderUrgencyGuideModal()}
      ${renderConcernHelpModal()}
      ${renderEmailPreviewModal()}
      ${renderWardContactModal()}
      ${renderOtherWardEmailModal()}
      ${renderNoticeRecipientModal()}
      ${renderNoticeDispatchAnimation()}
      ${renderVisitLogHandoverBanner()}
    </div>
  `;
  runPostRenderEffects();
}

function renderStartView() {
  return `
    <main class="start-view" aria-labelledby="start-title">
      <div class="start-shell">
        <header class="start-header">
          <div>
            <p class="start-app-title">Martha's Rule Call Triage and Visit Log</p>
            ${renderVersionControl("start")}
          </div>
          <div class="start-header-actions">
            <button class="theme-toggle-button" type="button" data-action="toggle-theme">${darkModeEnabled ? "Light mode" : "Dark mode"}</button>
            <img class="start-logo" src="assets/UCLH logo colour 2.jpg" alt="UCLH" />
          </div>
        </header>
        <h1 id="start-title">What are we doing today?</h1>
        <div class="start-options">
          <button class="start-option" type="button" data-action="start-mode" data-tab="triage">
            <span>Call triage</span>
            <strong>I am triaging a call</strong>
          </button>
          <button class="start-option" type="button" data-action="start-mode" data-tab="visitLog">
            <span>Call visit log</span>
            <strong>I am logging a review</strong>
          </button>
          <button class="process-poster-alert" type="button" data-action="open-process-poster">
            <span aria-hidden="true">i</span>
            <strong>Martha's Rule call process</strong>
          </button>
        </div>
      </div>
      ${renderProcessPosterModal()}
    </main>
  `;
}

function renderProcessPosterModal() {
  if (!processPosterOpen) return "";

  return `
    <div class="process-poster-overlay" role="dialog" aria-modal="true" aria-labelledby="process-poster-title">
      <section class="process-poster-panel">
        <header class="process-poster-header">
          <div>
            <p>Process poster</p>
            <h2 id="process-poster-title">Martha's Rule Call Process: Old vs New</h2>
          </div>
          <button class="btn secondary modal-close" type="button" data-action="close-process-poster" aria-label="Close process poster">Close</button>
        </header>
        <iframe class="process-poster-frame" src="marthas-rule-process-poster.html" title="Martha's Rule Call Process: Old vs New"></iframe>
      </section>
    </div>
  `;
}

function renderHeader() {
  return `
    <header class="app-header">
      <div class="app-title-block">
        <h1>Martha's Rule Call Triage and Visit Log</h1>
        ${renderVersionControl("app")}
      </div>
      <div class="header-progress">
        ${renderProgress()}
      </div>
      <div class="header-actions">
        <button class="theme-toggle-button" type="button" data-action="toggle-theme">${darkModeEnabled ? "Light mode" : "Dark mode"}</button>
        <img class="uclh-logo" src="assets/UCLH logo colour 2.jpg" alt="UCLH" />
      </div>
    </header>
  `;
}

function renderVersionControl(context = "app") {
  return `
    <div class="version-control ${context === "start" ? "start" : "app"}">
      <button class="version-button ${autoFillMenuOpen ? "open" : ""}" type="button" data-action="toggle-version-menu" aria-expanded="${autoFillMenuOpen ? "true" : "false"}" aria-haspopup="true">
        Version ${escapeHtml(APP_VERSION)}
      </button>
      ${autoFillMenuOpen ? `
        <div class="version-menu" role="menu" aria-label="Version tools">
          <button class="auto-fill-button" type="button" data-action="auto-fill-test" role="menuitem">Auto fill</button>
        </div>
      ` : ""}
    </div>
  `;
}

function applyThemeClass() {
  document.body.classList.toggle("dark-mode", darkModeEnabled);
}

function loadThemePreference() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  darkModeEnabled = savedTheme === "dark";
  applyThemeClass();
}

function toggleThemePreference() {
  darkModeEnabled = !darkModeEnabled;
  localStorage.setItem(THEME_STORAGE_KEY, darkModeEnabled ? "dark" : "light");
  applyThemeClass();
}

function renderTabs() {
  return `
    <nav class="app-tabs" aria-label="Main app sections">
      <button class="tab-button ${activeTab === "triage" ? "active" : ""}" type="button" data-action="set-tab" data-tab="triage">Call triage</button>
      <button class="tab-button ${activeTab === "visitLog" ? "active" : ""}" type="button" data-action="set-tab" data-tab="visitLog">Call visit log</button>
    </nav>
  `;
}

function renderVisitLogTab() {
  const current = visitLogSteps[state.currentVisitStep];
  return `
    <div class="tabbed-stage">
      ${renderVisitLogStepOverview()}
      <article class="card workflow-card tabbed-workflow-card visit-log-workflow-card">
        <div class="card-body">
          <div class="visit-log-stack">
            ${current.render()}
            ${renderVisitLogNavigation()}
            ${renderGeneratedOutputs()}
          </div>
        </div>
      </article>
    </div>
  `;
}

function renderVisitLogHandoverBanner() {
  const handover = state.visitLog.handover || {};
  if (activeTab !== "visitLog" || !handover.active || !state.visitLog.clinicalAssessment.caseCode) return "";
  const style = handoverWindowPosition.x !== null && handoverWindowPosition.y !== null
    ? ` style="left:${Math.round(handoverWindowPosition.x)}px; top:${Math.round(handoverWindowPosition.y)}px; right:auto;"`
    : "";

  return `
    <section class="visit-handover-banner ${handoverWindowMinimized ? "minimized" : ""}" aria-label="Triage handover summary"${style}>
      <div class="visit-handover-heading" data-action="drag-handover-window">
        <span>Handover from call triage</span>
        <strong>Case ${escapeHtml(state.visitLog.clinicalAssessment.caseCode)}</strong>
        <button class="handover-minimise" type="button" data-action="toggle-handover-window" aria-label="${handoverWindowMinimized ? "Expand handover note" : "Minimise handover note"}">
          ${handoverWindowMinimized ? "Expand" : "Minimise"}
        </button>
      </div>
      <button class="handover-collapsed-button" type="button" data-action="toggle-handover-window" data-drag-handle="handover-window">
        Case ${escapeHtml(state.visitLog.clinicalAssessment.caseCode)} · MRN ${escapeHtml(state.patient.mrn || "not provided")}
      </button>
      <div class="visit-handover-grid">
        ${summaryRow("MRN", state.patient.mrn || "Not provided")}
        ${summaryRow("Triage category", handover.triageCategory || "Not provided")}
        ${summaryRow("Primary concern", handover.primaryConcern || "Not provided")}
        ${summaryRow("Secondary concern", handover.secondaryConcern || "Not provided")}
        ${handover.callerConcernSummary ? `<div class="visit-handover-summary"><span>Caller concern summary</span><strong>${escapeHtml(handover.callerConcernSummary)}</strong></div>` : ""}
      </div>
    </section>
  `;
}

function renderVisitLogStepOverview() {
  return `
    <nav class="step-overview triage-step-overview visit-step-overview" aria-label="Call visit log workflow steps">
      ${visitLogSteps.map((step, index) => `
        <button class="step-pill ${visitLogStepStatusClass(step, index)}" type="button" data-action="set-visit-step" data-step="${index}" aria-current="${index === state.currentVisitStep ? "step" : "false"}">
          <span>${index + 1}</span>
          <strong>${escapeHtml(step.title)}${index !== state.currentVisitStep && isVisitLogStepComplete(step.id) ? '<em class="tab-check" aria-hidden="true">✓</em>' : ""}</strong>
        </button>
      `).join("")}
    </nav>
  `;
}

function visitLogStepStatusClass(step, index) {
  if (index === state.currentVisitStep) return "current";
  return isVisitLogStepComplete(step.id) ? "complete" : "incomplete";
}

function isVisitLogStepComplete(stepId) {
  const visit = state.visitLog;
  if (stepId === "clinicalAssessment") {
    return Boolean(
      state.patient.mrn &&
      visit.dateOfVisit &&
      visit.clinicalAssessment.news2AtCall &&
      visit.clinicalAssessment.news2AtAttendance
    );
  }
  if (stepId === "actionsOutcomes") {
    return Boolean(
      visit.actionsOutcomes.perrtActionsTaken.length &&
      visit.actionsOutcomes.totalTimeSpent &&
      visit.actionsOutcomes.outcomes.length
    );
  }
  if (stepId === "callCategory") {
    return visit.recategoriseCall === "no" || (visit.recategoriseCall === "yes" && triageCategoryIsComplete(visit.callCategory));
  }
  if (stepId === "learningNotifications") {
    const learningComplete = visit.actionsOutcomes.learningIdentified === "no" ||
      Boolean(visit.actionsOutcomes.learningIdentified && visit.actionsOutcomes.learningTheme);
    return Boolean(learningComplete);
  }
  if (stepId === "visitLogActions") {
    return isVisitLogStepComplete("clinicalAssessment") &&
      isVisitLogStepComplete("actionsOutcomes") &&
      isVisitLogStepComplete("callCategory") &&
      isVisitLogStepComplete("learningNotifications");
  }
  return false;
}

function renderVisitLogCallCategorySection() {
  return `
    <section class="visit-log-section">
      <h3>Call category</h3>
      <div class="field-grid">
        ${radioGroup("Do you need to re-categorise this call?", "visitLog.recategoriseCall", [["yes", "Yes"], ["no", "No"]])}
      </div>
      ${state.visitLog.recategoriseCall === "yes" ? renderCallCategoryCascade() : ""}
    </section>
  `;
}

function renderVisitLogClinicalAssessmentSection() {
  return `
    <section class="visit-log-section">
      <h3>Attendance and Clinical Assessment</h3>
      <div class="field-grid">
        ${field("6-digit code", "visitLog.clinicalAssessment.caseCode", "text", "ABC123", "text", 6)}
        ${field("MRN number", "patient.mrn")}
        ${selectField("Ethnic group", "patient.ethnicGroup", ethnicGroupOptions, "Select ethnic group")}
        ${selectField("Ward / Area", "visitLog.location.wardArea", wardAreaOptions, "Select ward / area")}
        ${state.visitLog.location.wardArea === "Other" ? field("Other ward / area", "visitLog.location.wardAreaOther", "text", "Enter ward / area") : ""}
        ${field("Bed number", "visitLog.location.bedNumber")}
        ${field("Date of visit", "visitLog.dateOfVisit", "date")}
        ${field("Time of PERRT/Outreach attendance", "visitLog.timeOfAttendance", "time", "Optional")}
        ${field("NEWS2 score at time of call", "visitLog.clinicalAssessment.news2AtCall", "number")}
        ${field("NEWS2 score at time of attendance", "visitLog.clinicalAssessment.news2AtAttendance", "number")}
        ${textarea("Additional clinical notes", "visitLog.clinicalAssessment.additionalClinicalNotes", "", "large")}
      </div>
    </section>
  `;
}

function renderVisitLogActionsOutcomesSection() {
  return `
    <section class="visit-log-section">
      <h3>Actions and Outcomes</h3>
      <div class="field-grid">
        ${checkboxGroup("PERRT actions taken", "visitLog.actionsOutcomes.perrtActionsTaken", perrtActionOptions)}
        ${field("Total time spent managing concern [hours]", "visitLog.actionsOutcomes.totalTimeSpent", "number")}
        ${selectArrayField("Outcome(s) of call", "visitLog.actionsOutcomes.outcomes", outcomeOptions, "Select call outcome")}
      </div>
    </section>
  `;
}

function renderVisitLogLearningNotificationsSection() {
  return `
    <section class="visit-log-section">
      <h3>Learning and Notifications</h3>
      <div class="field-grid">
        ${radioGroup("Learning identified?", "visitLog.actionsOutcomes.learningIdentified", [["yes", "Yes"], ["no", "No"], ["pending", "Pending"]])}
        ${state.visitLog.actionsOutcomes.learningIdentified && state.visitLog.actionsOutcomes.learningIdentified !== "no" ? `
          ${selectField("Learning theme", "visitLog.actionsOutcomes.learningTheme", learningThemeOptions, "Select learning theme")}
          ${textarea("Feedback / learning notes", "visitLog.actionsOutcomes.feedbackLearningNotes")}
        ` : ""}
        <div class="field-note">
          By default, this call visit log will be sent to managers and matrons.
        </div>
      </div>
    </section>
  `;
}

function renderVisitLogReviewSection() {
  const urgency = activeFormUrgency();
  const visit = state.visitLog;
  const category = activeFormCategory();
  const visitLogReady = isVisitLogStepComplete("visitLogActions");
  return `
    <section class="visit-log-section">
      <h3>Review and Submit</h3>
      <div class="visit-review-panel">
        <div class="visit-review-grid">
          ${renderVisitReviewCard("1", "Attendance and Clinical Assessment", [
            ["6-digit code", visit.clinicalAssessment.caseCode],
            ["MRN number", state.patient.mrn],
            ["Ward / Area", visitLogWardAreaDisplayValue()],
            ["Bed number", state.visitLog.location.bedNumber],
            ["Date of visit", formatDateForEmail(visit.dateOfVisit)],
            ["Time of attendance", visit.timeOfAttendance],
            ["NEWS2 at call", visit.clinicalAssessment.news2AtCall],
            ["NEWS2 at attendance", visit.clinicalAssessment.news2AtAttendance],
            ["Clinical notes", visit.clinicalAssessment.additionalClinicalNotes],
          ])}
          ${renderVisitReviewCard("2", "Actions and Outcomes", [
            ["PERRT actions taken", listLabels(perrtActionOptions, visit.actionsOutcomes.perrtActionsTaken)],
            ["Total time spent [hours]", visit.actionsOutcomes.totalTimeSpent],
            ["Outcome", listLabels(outcomeOptions, visit.actionsOutcomes.outcomes)],
          ])}
          ${renderVisitReviewCard("3", "Call Category", [
            ["Re-categorised", visit.recategoriseCall ? optionLabel([["yes", "Yes"], ["no", "No"]], visit.recategoriseCall) : ""],
            ...(visit.recategoriseCall === "yes" ? [
              ["Submitted category", categoryDisplayLabel(urgency)],
              ["Category detail", categoryOfCallLabel(category)],
              ["Core concern", primaryConcernFormValueForCategory(category)],
              ["Secondary concern", secondaryConcernFormValueForCategory(category)],
            ] : []),
          ])}
          ${renderVisitReviewCard("4", "Learning and Notifications", [
            ["Learning identified", learningStatusLabel()],
            ["Learning theme", visit.actionsOutcomes.learningTheme],
            ["Feedback / learning notes", visit.actionsOutcomes.feedbackLearningNotes],
          ])}
        </div>
        <div class="route-actions">
          <button class="btn secondary visit-send-button ${visitLogReady ? "ready-form" : ""}" type="button" data-action="open-ms-form">Send Notice to teams</button>
          <button class="btn secondary" type="button" data-action="preview-email">Preview automated email</button>
          <button class="btn secondary" type="button" data-action="generate">Generate structured summary</button>
          <button class="btn danger" type="button" data-action="reset">Reset form</button>
        </div>
      </div>
    </section>
  `;
}

function renderVisitReviewCard(number, title, rows) {
  return `
    <article class="visit-review-card">
      <header>
        <span>${escapeHtml(number)}</span>
        <h4>${escapeHtml(title)}</h4>
      </header>
      <div class="visit-review-rows">
        ${rows.map(([label, value]) => `
          <div class="visit-review-row">
            <span>${escapeHtml(label)}</span>
            <strong>${escapeHtml(value || "Not entered")}</strong>
          </div>
        `).join("")}
      </div>
    </article>
  `;
}

function renderVisitLogNavigation() {
  return `
    <div class="actions">
      <button class="btn secondary" data-action="visit-previous" ${state.currentVisitStep === 0 ? "disabled" : ""}>Previous</button>
      <button class="btn primary" data-action="visit-next" ${state.currentVisitStep >= visitLogSteps.length - 1 ? "disabled" : ""}>Next</button>
    </div>
  `;
}

function renderProgress() {
  const isVisitLog = activeTab === "visitLog";
  const steps = isVisitLog ? visitLogSteps : getSteps();
  const index = isVisitLog ? state.currentVisitStep : state.currentStep;
  const percent = Math.round(((index + 1) / steps.length) * 100);

  return `
    <div class="progress-box" aria-label="Workflow progress">
      <div class="progress-text">Step ${index + 1} of ${steps.length}: ${escapeHtml(steps[index].title)}</div>
      <div class="progress-track"><span style="width:${percent}%"></span></div>
    </div>
  `;
}

function renderWorkflow(current) {
  return `
    <article class="card workflow-card tabbed-workflow-card">
      <div class="card-body">
        ${current.render()}
        ${renderNavigation()}
        ${renderGeneratedOutputs()}
      </div>
    </article>
  `;
}

function renderCallTriageStepOverview() {
  if (activeTab !== "triage") return "";
  const steps = getSteps();
  return `
    <nav class="step-overview triage-step-overview" aria-label="Call triage workflow steps">
      ${steps.map((step, index) => `
        <button class="step-pill ${stepStatusClass(step, index)}" type="button" data-action="set-step" data-step="${index}" aria-current="${index === state.currentStep ? "step" : "false"}">
          <span>${index + 1}</span>
          <strong>${escapeHtml(step.title)}${index !== state.currentStep && isStepComplete(step.id) ? '<em class="tab-check" aria-hidden="true">✓</em>' : ""}</strong>
        </button>
      `).join("")}
    </nav>
  `;
}

function stepStatusClass(step, index) {
  if (index === state.currentStep) return "current";
  return isStepComplete(step.id) ? "complete" : "incomplete";
}

function isStepComplete(stepId) {
  if (stepId === "callDetails") {
    return Boolean(state.callDetails.dateOfReferral && state.callDetails.timePhoneAnswered && state.callDetails.repeatCall);
  }
  if (stepId === "patient") return Boolean(state.patient.mrn);
  if (stepId === "location") return wardAreaComplete(state.location.wardArea, state.location.wardAreaOther);
  if (stepId === "caller") return Boolean(state.caller.callerType);
  if (stepId === "triage") return triageCategoryIsComplete(state.triage);
  if (stepId === "concernSummary") return Boolean(state.concernSummary.concernsSummary);
  if (stepId === "repeatCallUpdate") return repeatCallUpdateIsComplete();
  if (stepId === "repeatContactReason") return Boolean(state.repeatCallUpdate.additionalInformation);
  if (stepId === "triageRouteAction") return isReadyForPrefilledForm();
  return false;
}

function repeatCallUpdateIsComplete() {
  return Boolean(
    state.repeatCallUpdate.mrn &&
    wardAreaComplete(state.repeatCallUpdate.wardArea, state.repeatCallUpdate.wardAreaOther) &&
    state.caller.callerType
  );
}

function renderGeneratedOutputs() {
  return `
    ${state.generatedSummaryHtml ? `
      <section class="generated-summary rich-summary-panel">
        <div class="rich-summary-heading">
          <h3>Generated structured summary for Epic</h3>
          <button class="summary-toggle" type="button" data-action="toggle-epic-summary">${epicSummaryCollapsed ? "Show" : "Hide"}</button>
        </div>
        ${epicSummaryCollapsed ? `
          <p class="rich-summary-collapsed-note">Epic summary is ready.</p>
        ` : `
          <div class="rich-summary" contenteditable="true" aria-label="Copyable rich structured summary">
            ${state.generatedSummaryHtml}
          </div>
        `}
      </section>
    ` : ""}
  `;
}

function renderNavigation() {
  const steps = getSteps();
  return `
    <div class="actions">
      <button class="btn secondary" data-action="previous" ${state.currentStep === 0 ? "disabled" : ""}>Previous</button>
      <button class="btn primary" data-action="next" ${state.currentStep >= steps.length - 1 ? "disabled" : ""}>Next</button>
      <button class="btn danger" data-action="reset">Reset form</button>
    </div>
  `;
}

function renderCallDetailsSection() {
  return `
    <div class="field-grid">
      ${field("Date of referral", "callDetails.dateOfReferral", "date")}
      ${field("Time phone answered [HH:MM 24 h]", "callDetails.timePhoneAnswered", "time")}
      ${radioGroup("Delay in answering?", "callDetails.delayInAnswering", [["yes", "Yes"], ["no", "No"], ["unsure", "Unsure"]])}
      ${radioGroup("Is this a repeat call?", "callDetails.repeatCall", [["yes", "Yes"], ["no", "No"]])}
    </div>
    ${state.callDetails.repeatCall === "yes" ? `
      <div class="notice">Repeat call selected. The workflow will capture the repeat-call update details.</div>
    ` : ""}
  `;
}

function renderRepeatCallSection() {
  return `
    <div class="field-grid">
      ${field("MRN number", "repeatCallUpdate.mrn")}
      ${selectField("Ward / Area", "repeatCallUpdate.wardArea", wardAreaOptions, "Select ward / area")}
      ${state.repeatCallUpdate.wardArea === "Other" ? field("Other ward / area", "repeatCallUpdate.wardAreaOther", "text", "Enter ward / area") : ""}
      ${field("Bed number", "repeatCallUpdate.bedNumber")}
      ${radioGroup("Who made the call?", "caller.callerType", callerTypeOptions)}
    </div>
  `;
}

function renderRepeatContactReasonSection() {
  return `
    <div class="field-grid">
      ${textarea("Why has the caller contacted the phoneline again?", "repeatCallUpdate.additionalInformation", "", "large")}
    </div>
  `;
}

function renderCallerSection() {
  return radioGroup("Who made the call?", "caller.callerType", callerTypeOptions);
}

function renderTriageSection() {
  const triage = state.triage;
  const showRedFlags = triage.acuteDeterioration === "yes" || triage.acuteDeterioration === "unsure";
  const hasAcuteWarningSigns = showRedFlags && triage.redFlags.some((item) => item !== "none");
  const skipSameDayReview = shouldAutoRouteToPerrt(triage);
  const redFlagsAnswered = !showRedFlags || triage.redFlags.length > 0;
  const showCoreConcern = !hasAcuteWarningSigns && (triage.acuteDeterioration === "no" || (showRedFlags && redFlagsAnswered));
  const isClinical = clinicalCoreConcerns.includes(triage.coreConcern);
  const coreAnswered = Boolean(triage.coreConcern);
  const sameDayAnswered = skipSameDayReview || !isClinical || triage.sameDayReview === "yes" || triage.sameDayReview === "no" || triage.sameDayReview === "unsure";
  const showSecondary = coreAnswered && sameDayAnswered;

  return `
    <div class="triage-cascade triage-guidance-cascade">
      ${renderTriageStatusPanel(triage)}
      ${triageQuestionCard("1", "Acute deterioration", `
        ${radioGroup("Is there concern that the patient may be acutely deteriorating right now?", "triage.acuteDeterioration", [["yes", "Yes"], ["no", "No"], ["unsure", "Unsure"]])}
      `)}

      ${showRedFlags ? triageQuestionCard("2", "Warning signs", `
          ${checkboxGroup("Acute warning signs", "triage.redFlags", redFlagOptions, true)}
          ${(triage.redFlags || []).includes("other") ? field("Other warning sign", "triage.otherRedFlagText", "text", "Add warning sign") : ""}
        `) : ""}

      ${showCoreConcern ? triageQuestionCard("3", "Primary concern", `
          ${groupedRadioGroup("Core concern", "triage.coreConcern", coreConcernGroups)}
        `) : ""}

      ${isClinical && !skipSameDayReview ? triageQuestionCard("4", "PERRT review", `
          ${radioGroup("Does this need urgent clinical review by PERRT/Outreach?", "triage.sameDayReview", [["yes", "Yes"], ["no", "No"], ["unsure", "Unsure"]])}
        `) : ""}

      ${coreAnswered && !isClinical && !skipSameDayReview ? skippedTriageQuestionCard("4", "PERRT review", "Skipped because the primary concern is service, administrative, environmental, unclear or non-clinical.") : ""}

      ${skipSameDayReview && coreAnswered ? `
        <div class="notice">Acute deterioration has been selected. This call will be routed at minimum as U2 for PERRT/Outreach review, so the separate PERRT review question is not needed.</div>
      ` : ""}

      ${showSecondary ? triageQuestionCard("5", "Secondary concern", `
          ${groupedCheckboxGroup("Secondary concern", "triage.secondaryFactors", secondaryConcernGroups)}
          <p class="muted section-help">Select any factors that are adding difficulty, delay, or distress.</p>
          ${renderGenuineWorryQuestion("triage", triage.secondaryFactors)}
        `) : ""}
    </div>
  `;
}

function triageQuestionCard(stepNumber, title, body, variant = "") {
  return `
    <section class="cascade-card triage-question-card triage-question-step-${escapeHtml(stepNumber)} ${variant ? `triage-question-${escapeHtml(variant)}` : ""}">
      <header class="triage-question-header">
        <span>${escapeHtml(stepNumber)}</span>
        <h3>${escapeHtml(title)}</h3>
      </header>
      <div class="triage-question-body">
        ${body}
      </div>
    </section>
  `;
}

function skippedTriageQuestionCard(stepNumber, title, message) {
  return triageQuestionCard(stepNumber, title, `
    <div class="skipped-question-message">
      ${escapeHtml(message)}
    </div>
  `, "skipped");
}

function queueTriageQuestionCenter() {
  pendingTriageQuestionCenter = true;
}

function runPostRenderEffects() {
  window.requestAnimationFrame(() => {
    if (pendingNoticeRecipientScrollTop !== null) {
      const noticeBody = document.querySelector(".notice-recipient-body");
      if (noticeBody) {
        noticeBody.scrollTop = pendingNoticeRecipientScrollTop;
      }
      pendingNoticeRecipientScrollTop = null;
    }
    if (!pendingTriageQuestionCenter) return;
    pendingTriageQuestionCenter = false;
    const cards = document.querySelectorAll(".triage-guidance-cascade .triage-question-card");
    const currentCard = cards[cards.length - 1];
    if (!currentCard) return;
    window.requestAnimationFrame(() => {
      currentCard.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    });
  });
}

function clampHandoverWindowPosition(x, y, element) {
  const width = element?.offsetWidth || 340;
  const height = element?.offsetHeight || 260;
  const margin = 10;
  return {
    x: Math.min(Math.max(margin, x), Math.max(margin, window.innerWidth - width - margin)),
    y: Math.min(Math.max(margin, y), Math.max(margin, window.innerHeight - height - margin)),
  };
}

function beginHandoverWindowDrag(event, handle) {
  const toggleTarget = event.target.closest("[data-action='toggle-handover-window']");
  if (toggleTarget && !toggleTarget.dataset.dragHandle) return;
  const windowElement = handle.closest(".visit-handover-banner");
  if (!windowElement) return;
  const rect = windowElement.getBoundingClientRect();
  handoverDragState = {
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    element: windowElement,
    startX: event.clientX,
    startY: event.clientY,
    moved: false,
  };
  windowElement.classList.add("dragging");
  handle.setPointerCapture?.(event.pointerId);
  event.preventDefault();
}

function updateHandoverWindowDrag(event) {
  if (!handoverDragState) return;
  if (Math.abs(event.clientX - handoverDragState.startX) > 4 || Math.abs(event.clientY - handoverDragState.startY) > 4) {
    handoverDragState.moved = true;
  }
  handoverWindowPosition = clampHandoverWindowPosition(
    event.clientX - handoverDragState.offsetX,
    event.clientY - handoverDragState.offsetY,
    handoverDragState.element,
  );
  handoverDragState.element.style.left = `${Math.round(handoverWindowPosition.x)}px`;
  handoverDragState.element.style.top = `${Math.round(handoverWindowPosition.y)}px`;
  handoverDragState.element.style.right = "auto";
}

function endHandoverWindowDrag() {
  if (!handoverDragState) return;
  handoverSuppressNextToggle = Boolean(handoverDragState.moved);
  handoverDragState.element.classList.remove("dragging");
  handoverDragState = null;
}

function renderTriageStatusPanel(category) {
  const urgency = calculateUrgencyFromCategory(category);

  return `
    <section class="triage-status-panel ${urgencyClass(urgency)}-panel" aria-live="polite">
      <div>
        <span class="status-eyebrow">Current outcome</span>
        <strong>${escapeHtml(categoryDisplayLabel(urgency))}</strong>
      </div>
    </section>
  `;
}

function renderCallCategoryCascade() {
  const category = state.visitLog.callCategory;
  const showRedFlags = category.acuteDeterioration === "yes" || category.acuteDeterioration === "unsure";
  const hasAcuteWarningSigns = showRedFlags && category.redFlags.some((item) => item !== "none");
  const skipSameDayReview = shouldAutoRouteToPerrt(category);
  const redFlagsAnswered = !showRedFlags || category.redFlags.length > 0;
  const showCoreConcern = !hasAcuteWarningSigns && (category.acuteDeterioration === "no" || (showRedFlags && redFlagsAnswered));
  const isClinical = clinicalCoreConcerns.includes(category.coreConcern);
  const coreAnswered = Boolean(category.coreConcern);
  const sameDayAnswered = skipSameDayReview || !isClinical || category.sameDayReview === "yes" || category.sameDayReview === "no" || category.sameDayReview === "unsure";
  const showSecondary = coreAnswered && sameDayAnswered;

  return `
    <div class="triage-cascade triage-guidance-cascade visit-category-cascade">
      ${renderTriageStatusPanel(category)}
      ${triageQuestionCard("1", "Acute deterioration", `
        ${radioGroup("Is there concern that the patient may be acutely deteriorating right now?", "visitLog.callCategory.acuteDeterioration", [["yes", "Yes"], ["no", "No"], ["unsure", "Unsure"]])}
      `)}

      ${showRedFlags ? triageQuestionCard("2", "Warning signs", `
          ${checkboxGroup("Acute warning signs", "visitLog.callCategory.redFlags", redFlagOptions, true)}
          ${(category.redFlags || []).includes("other") ? field("Other warning sign", "visitLog.callCategory.otherRedFlagText", "text", "Add warning sign") : ""}
        `) : ""}

      ${showCoreConcern ? triageQuestionCard("3", "Primary concern", `
          ${groupedRadioGroup("Core concern", "visitLog.callCategory.coreConcern", coreConcernGroups)}
        `) : ""}

      ${isClinical && !skipSameDayReview ? triageQuestionCard("4", "PERRT review", `
          ${radioGroup("Does this need urgent clinical review by PERRT/Outreach?", "visitLog.callCategory.sameDayReview", [["yes", "Yes"], ["no", "No"], ["unsure", "Unsure"]])}
        `) : ""}

      ${coreAnswered && !isClinical && !skipSameDayReview ? skippedTriageQuestionCard("4", "PERRT review", "Skipped because the primary concern is service, administrative, environmental, unclear or non-clinical.") : ""}

      ${skipSameDayReview && coreAnswered ? `
        <div class="notice">Acute deterioration has been selected. This call will be routed at minimum as U2 for PERRT/Outreach review, so the separate PERRT review question is not needed.</div>
      ` : ""}

      ${showSecondary ? triageQuestionCard("5", "Secondary concern", `
          ${groupedCheckboxGroup("Secondary concern", "visitLog.callCategory.secondaryFactors", secondaryConcernGroups)}
          <p class="muted section-help">Select any factors that are adding difficulty, delay, or distress.</p>
          ${renderGenuineWorryQuestion("visitLog.callCategory", category.secondaryFactors)}
        `) : ""}

    </div>
  `;
}

function renderGenuineWorryQuestion(pathPrefix, secondaryFactors) {
  if ((secondaryFactors || []).length > 0) return "";
  return `
    <div class="secondary-follow-up">
      ${radioGroup("No secondary concern is selected. Would you say the patient or family rang out of genuine worry and concern for the patient's condition?", `${pathPrefix}.genuineWorry`, [["yes", "Yes"], ["no", "No"]])}
    </div>
  `;
}

function renderConcernSummarySection() {
  return `
    <div class="field-grid">
      ${textarea("Concerns raised by caller (summary)", "concernSummary.concernsSummary", "", "large")}
    </div>
  `;
}

function renderWardContactModal() {
  if (!wardContactModalOpen) return "";
  const isVisitLogWardContact = activeTab === "visitLog";
  const wardContactPath = isVisitLogWardContact ? "visitLog.callCategory.wardContact" : "triage.wardContact";
  const wardContactValue = isVisitLogWardContact ? state.visitLog.callCategory.wardContact : state.triage.wardContact;

  return `
    <div class="modal-backdrop">
      <section class="ward-contact-modal" role="dialog" aria-modal="true" aria-labelledby="ward-contact-title">
        <div class="modal-header">
          <div>
            <h2 id="ward-contact-title">Ward contact check</h2>
            <p>Complete this before moving on from ${isVisitLogWardContact ? "the re-triage" : "triage"}.</p>
          </div>
          <button class="btn secondary modal-close" type="button" data-action="close-ward-contact-modal" aria-label="Close ward contact check">Close</button>
        </div>
        <div class="ward-contact-body">
          ${radioGroup("Has the caller contacted the ward staff about this concern?", wardContactPath, [["yes", "Yes - caller has contacted ward staff"], ["no", "No - caller has not yet contacted ward staff"], ["unable", "Caller tried but could not reach ward staff"], ["unsure", "Unsure / not known"]])}
        </div>
        <div class="ward-contact-actions">
          <button class="btn secondary" type="button" data-action="close-ward-contact-modal">Back to ${isVisitLogWardContact ? "re-triage" : "triage"}</button>
          <button class="btn primary" type="button" data-action="complete-ward-contact" ${wardContactValue ? "" : "disabled"}>Continue</button>
        </div>
      </section>
    </div>
  `;
}

function renderOtherWardEmailModal() {
  if (!otherWardEmailModalOpen) return "";
  const recipientPath = activeTab === "visitLog" ? "visitLog.notifications.otherEmails" : isRepeatOnlyMode() ? "repeatCallUpdate.otherWardRecipientEmails" : "location.otherWardRecipientEmails";

  return `
    <div class="modal-backdrop">
      <section class="other-ward-email-modal" role="dialog" aria-modal="true" aria-labelledby="other-ward-email-title">
        <div class="modal-header">
          <div>
            <h2 id="other-ward-email-title">Other ward email required</h2>
            <p>You have chosen Other in the ward. The system does not have an address for Other.</p>
          </div>
          <button class="btn secondary modal-close" type="button" data-action="close-other-ward-email-modal" aria-label="Close other ward email warning">Close</button>
        </div>
        <div class="other-ward-email-body">
          <div class="notice">Please enter or review the NHS email of the local team recipient. Use a comma or semicolon for multiple recipients.</div>
          ${field("Recipient NHS email(s)", recipientPath, "text", "recipient@nhs.net; second.recipient@nhs.net")}
        </div>
        <div class="other-ward-email-actions">
          <button class="btn secondary" type="button" data-action="close-other-ward-email-modal">Back</button>
          <button class="btn primary" type="button" data-action="complete-other-ward-email">Continue</button>
        </div>
      </section>
    </div>
  `;
}

function renderNoticeRecipientModal() {
  if (!noticeRecipientModalOpen) return "";
  const selected = new Set(state.triage.noticeRecipients || []);
  const recipientsByGroup = noticeRecipientOptions.reduce((groups, recipient) => {
    const group = recipient[4] || "nurse";
    groups[group] = groups[group] || [];
    groups[group].push(recipient);
    return groups;
  }, {});

  return `
    <div class="modal-backdrop">
      <section class="notice-recipient-modal" role="dialog" aria-modal="true" aria-labelledby="notice-recipient-title">
        <div class="modal-header">
          <div>
            <h2 id="notice-recipient-title">Notify Local and PERRT Teams</h2>
            <p>Open the pre-filled NHS Microsoft Form after choosing PERRT notice recipients.</p>
          </div>
          <button class="btn secondary modal-close" type="button" data-action="close-notice-recipient-modal" aria-label="Close notice recipient selection">Close</button>
        </div>
        <div class="notice-recipient-body">
          <div class="notice">
            This email will be cascaded to recipients linked to the clinical area you have chosen. These are managers, deputy matrons and matrons. The PERRT team email will also be an automatic recipient to this notice. Should you wish to identify a PERRT nurse, you may do so by clicking their name.
          </div>
          <div class="notice">
            Who should this notice go to apart from the PERRT shared email?
          </div>
          <div class="notice-recipient-options">
            ${noticeRecipientGroups.map((group) => {
              const recipients = recipientsByGroup[group.key] || [];
              if (!recipients.length) return "";
              return `
                <section class="recipient-group recipient-group-${group.tone}">
                  <div class="recipient-group-header">
                    <strong>${escapeHtml(group.title)}</strong>
                  </div>
                  <div class="recipient-group-list">
                    ${recipients.map(([email, name, role, status]) => {
                      const unavailable = status === "unavailable";
                      return `
                        <button class="recipient-option ${selected.has(email) ? "selected" : ""} ${unavailable ? "unavailable" : ""}" type="button" data-action="toggle-notice-recipient" data-email="${escapeHtml(email)}" aria-pressed="${selected.has(email) ? "true" : "false"}" ${unavailable ? "disabled aria-disabled=\"true\"" : ""}>
                          <span class="recipient-name">${escapeHtml(name)}</span>
                          <span class="recipient-role">${escapeHtml(role)}</span>
                          <span class="recipient-email">${escapeHtml(email)}</span>
                        </button>
                      `;
                    }).join("")}
                  </div>
                </section>
              `;
            }).join("")}
          </div>
        </div>
        <div class="notice-recipient-actions">
          <button class="btn secondary" type="button" data-action="close-notice-recipient-modal">Back</button>
          <button class="btn primary" type="button" data-action="complete-notice-recipient">Open pre-filled NHS MS Form</button>
        </div>
      </section>
    </div>
  `;
}

function renderNoticeDispatchAnimation() {
  if (!noticeDispatchAnimationVisible) return "";
  return `
    <div class="notice-send-overlay" aria-hidden="true">
      <div class="notice-send-stage">
        <div class="notice-lane"></div>
        <div class="notice-core">
          <div class="notice-paper"></div>
          <div class="notice-envelope">
            <div class="envelope-body"></div>
            <div class="envelope-flap"></div>
          </div>
        </div>
        <div class="notice-carrier">
          <div class="carrier-envelope"></div>
          <div class="carrier-trail"></div>
        </div>
        <div class="notice-flight local">
          <div class="flight-envelope"></div>
          <span>Local Teams</span>
        </div>
        <div class="notice-flight perrt">
          <div class="flight-envelope"></div>
          <span>PERRT</span>
        </div>
      </div>
    </div>
  `;
}

function playNoticeDispatchAnimation() {
  noticeDispatchAnimationVisible = true;
  if (noticeDispatchAnimationTimeout) {
    clearTimeout(noticeDispatchAnimationTimeout);
  }
  noticeDispatchAnimationTimeout = window.setTimeout(() => {
    noticeDispatchAnimationVisible = false;
    noticeDispatchAnimationTimeout = null;
    renderApp();
  }, 2200);
}

function openNoticeRecipientModalWithAnimation() {
  if (noticeRecipientRevealTimeout) {
    clearTimeout(noticeRecipientRevealTimeout);
    noticeRecipientRevealTimeout = null;
  }
  noticeRecipientModalOpen = false;
  playNoticeDispatchAnimation();
  renderApp();
  noticeRecipientRevealTimeout = window.setTimeout(() => {
    noticeRecipientModalOpen = true;
    noticeRecipientRevealTimeout = null;
    renderApp();
  }, 900);
}

function renderPatientSection() {
  return `
    <div class="field-grid">
      ${field("MRN number", "patient.mrn")}
      ${field("Date of birth", "patient.dob", "date")}
      ${selectField("Gender", "patient.gender", genderOptions, "Select gender")}
      ${radioGroup("Learning Disability or Neurodiversity", "patient.learningDisabilityNeurodiversity", [["yes", "Yes"], ["no", "No"], ["not_known", "Not known"]])}
    </div>
  `;
}

function renderLocationSection() {
  return `
    <div class="field-grid">
      ${selectField("Ward / Area", "location.wardArea", wardAreaOptions, "Select ward / area")}
      ${state.location.wardArea === "Other" ? field("Other ward / area", "location.wardAreaOther", "text", "Enter ward / area") : ""}
      ${field("Bed number", "location.bedNumber")}
      ${selectField("Specialty / Medical team", "location.specialtyMedicalTeam", specialtyOptions, "Select specialty / team")}
    </div>
  `;
}

function renderTriageRouteActionSection() {
  const urgency = currentRouteUrgency();
  const route = calculateRoute(urgency);
  const action = triageActionDetail(urgency);
  const canCall = Boolean(action.phoneNumber);
  return `
    <section class="route-action-panel ${urgencyClass(urgency)}-panel">
      <div class="route-category">
        <span>Triage route and action</span>
        <h3>Category: ${escapeHtml(categoryDisplayLabel(urgency))}</h3>
      </div>
      <p class="route-route">${escapeHtml(route)}</p>
      <p>${escapeHtml(action.instruction)}</p>
      ${canCall ? "" : `<div class="route-reminder">Action reminder: ring the local team to inform them of the Martha's Rule call.</div>`}
      <div class="route-actions">
        ${canCall ? `<a class="btn primary" href="tel:${escapeHtml(action.phoneNumber)}">Call ${escapeHtml(action.callLabel)}</a>` : ""}
        <div class="route-action-stack">
          <button class="btn secondary notify-form-button ${isReadyForPrefilledForm() ? "ready-form" : ""}" type="button" data-action="open-ms-form" ${isReadyForPrefilledForm() ? "" : "disabled"}>
            <span>Notify Local and PERRT Teams</span>
            <small>Open pre-filled NHS MS Form</small>
          </button>
          <button class="btn secondary" type="button" data-action="preview-email">Preview automated email</button>
        </div>
        <button class="btn secondary" type="button" data-action="generate">Generate structured summary</button>
      </div>
    </section>
  `;
}

function renderSummaryPanel() {
  if (isRepeatOnlyMode()) return renderRepeatSummaryPanel();

  const urgency = calculateUrgency();
  const route = calculateRoute(urgency);
  const redFlagsPresent = state.triage.redFlags.some((item) => item !== "none");

  return `
    <div class="sticky">
      <div class="summary-heading summary-heading-row">
        <h2>Live summary</h2>
        <button class="summary-toggle" type="button" data-action="toggle-summary">${summaryCollapsed ? "Show" : "Hide"}</button>
      </div>
      <button class="urgency ${urgencyClass(urgency)}" type="button" data-action="open-urgency-guide">${escapeHtml(categoryDisplayLabel(urgency))}</button>
      ${summaryCollapsed ? "" : `
      ${summaryRow("Core concern", primaryConcernFormValueForCategory(state.triage) || "Not selected")}
      ${summaryRow("Secondary concerns", listLabels(secondaryFactorOptions, state.triage.secondaryFactors))}
      ${summaryRow("Ward contacted", wardContactLabel(state.triage.wardContact))}
      ${summaryRow("Suggested route", route)}
      ${summaryRow("Caller type", state.caller.callerType || "Not selected")}
      ${summaryRow("Repeat call", state.callDetails.repeatCall || "Not selected")}
      ${summaryRow("Ward / area", locationWardAreaDisplayValue() || "Not entered")}
      ${summaryRow("Specialty", state.location.specialtyMedicalTeam || "Not entered")}
      ${summaryRow("Short concern summary", state.concernSummary.concernsSummary || "Not entered")}
      ${summaryRow("Red flags present", redFlagsPresent ? "Yes" : "No")}
      `}
    </div>
  `;
}

function renderRepeatSummaryPanel() {
  const ready = isReadyForPrefilledForm();
  const triageValue = repeatCallTriageFormValue();

  return `
    <div class="sticky">
      <div class="summary-heading summary-heading-row">
        <h2>Repeat-call summary</h2>
        <button class="summary-toggle" type="button" data-action="toggle-summary">${summaryCollapsed ? "Show" : "Hide"}</button>
      </div>
      ${summaryCollapsed ? summaryRow("Triage code", triageValue || "Not selected") : `
      ${summaryRow("Repeat call", "Yes")}
      ${summaryRow("MRN", state.repeatCallUpdate.mrn || "Not entered")}
      ${summaryRow("Ward / area", repeatWardAreaDisplayValue() || "Not entered")}
      ${summaryRow("Bed number", state.repeatCallUpdate.bedNumber || "Not entered")}
      ${summaryRow("Caller", callerTypeFormLabel() || "Not selected")}
      ${summaryRow("Reason for repeat contact", state.repeatCallUpdate.additionalInformation || "Not entered")}
      ${summaryRow("Triage code", triageValue || "Not selected")}
      ${summaryRow("Ready for submission", ready ? "Yes" : "No")}
      `}
    </div>
  `;
}

function currentLiveTriageNode() {
  const triage = state.triage;
  const redFlags = triage.redFlags || [];
  const hasWarningSigns = hasSelectedWarningSigns(triage);

  if (isRepeatOnlyMode() && state.repeatCallUpdate.triageMethod === "direct" && state.repeatCallUpdate.directTriageCode) {
    return state.repeatCallUpdate.directTriageCode;
  }

  if (!state.callDetails.dateOfReferral || !state.callDetails.timePhoneAnswered) return "call_received";
  if (!state.callDetails.repeatCall) return "repeat_decision";
  if (!triage.acuteDeterioration) return "triage_process";
  if ((triage.acuteDeterioration === "yes" || triage.acuteDeterioration === "unsure") && !redFlags.length) return "triage_process";
  if (hasWarningSigns) return "U1_immediate_emergency";
  if (!triage.coreConcern) return "triage_process";
  if (requiresSameDayReviewQuestion(triage) && !triage.sameDayReview) return "triage_process";
  return calculateUrgency();
}

function liveNodeClass(nodeKey, activeNode) {
  return nodeKey === activeNode ? "live-current" : "";
}

function livePathClass(pathKey, activeNode) {
  const repeatTriage = isRepeatOnlyMode();
  const triageEntryPaths = repeatTriage
    ? ["call_to_repeat", "repeat_to_update", "repeat_update_to_triage"]
    : ["call_to_repeat", "repeat_to_triage"];
  const activePathsByNode = {
    call_received: [],
    repeat_decision: ["call_to_repeat"],
    repeat_pathway: ["call_to_repeat", "repeat_to_update"],
    triage_process: triageEntryPaths,
    U1_immediate_emergency: [...triageEntryPaths, "triage_to_u1"],
    U2_same_day_clinical: [...triageEntryPaths, "triage_to_u2"],
    U3_routine_clinical: [...triageEntryPaths, "triage_to_u3"],
    U4_service_or_admin: [...triageEntryPaths, "triage_to_u4"],
    U5_unclear_or_insufficient_info: [...triageEntryPaths, "triage_to_u5"],
  };

  return (activePathsByNode[activeNode] || []).includes(pathKey) ? "live-active" : "";
}

function renderLiveTriageMap() {
  const activeNode = currentLiveTriageNode();
  const urgency = currentRouteUrgency();

  return `
    <section class="live-map ${urgencyClass(urgency)} ${liveMapMinimized ? "minimized" : ""}" aria-label="Live triage pathway position">
      <div class="live-map-header">
        <strong>Live pathway</strong>
        <span>${escapeHtml(urgencyLabels[urgency])}</span>
        <button class="live-map-toggle" type="button" data-action="toggle-live-map" aria-label="${liveMapMinimized ? "Expand live pathway" : "Minimise live pathway"}">${liveMapMinimized ? "Show" : "Minimise"}</button>
      </div>
      ${liveMapMinimized ? "" : `
      <svg class="triage-sankey compact-sankey" viewBox="0 0 1180 620" role="img" aria-label="Current Martha's Rule triage pathway position">
        <path class="sankey-flow sankey-main ${livePathClass("call_to_repeat", activeNode)}" d="M145 305 C225 305, 250 305, 330 305" />
        <path class="sankey-flow sankey-repeat ${livePathClass("repeat_to_update", activeNode)}" d="M480 305 C575 105, 660 90, 760 95" />
        <path class="sankey-flow sankey-repeat ${livePathClass("repeat_update_to_triage", activeNode)}" d="M802 140 C802 175, 790 200, 790 230" />
        <path class="sankey-flow sankey-main ${livePathClass("repeat_to_triage", activeNode)}" d="M480 305 C570 305, 615 305, 705 305" />
        <path class="sankey-flow sankey-u1 ${livePathClass("triage_to_u1", activeNode)}" d="M860 305 C930 145, 965 105, 1040 95" />
        <path class="sankey-flow sankey-u2 ${livePathClass("triage_to_u2", activeNode)}" d="M860 305 C940 220, 965 205, 1040 205" />
        <path class="sankey-flow sankey-u3 ${livePathClass("triage_to_u3", activeNode)}" d="M860 305 C945 305, 965 305, 1040 305" />
        <path class="sankey-flow sankey-u4 ${livePathClass("triage_to_u4", activeNode)}" d="M860 305 C940 392, 965 415, 1040 415" />
        <path class="sankey-flow sankey-u5 ${livePathClass("triage_to_u5", activeNode)}" d="M860 305 C930 505, 965 525, 1040 525" />

        <g class="${liveNodeClass("call_received", activeNode)}">
          <rect x="35" y="245" width="150" height="120" class="sankey-node sankey-start-node" />
          <text x="110" y="305" class="sankey-title compact-title" text-anchor="middle">
            <tspan x="110" dy="0">Call</tspan>
            <tspan x="110" dy="25">received</tspan>
          </text>
        </g>

        <g class="${liveNodeClass("repeat_decision", activeNode)}">
          <rect x="330" y="245" width="165" height="120" class="sankey-node sankey-repeat-node" />
          <text x="412" y="305" class="sankey-title compact-title" text-anchor="middle">
            <tspan x="412" dy="0">Repeat</tspan>
            <tspan x="412" dy="25">call?</tspan>
          </text>
        </g>

        <g class="${liveNodeClass("repeat_pathway", activeNode)}">
          <rect x="720" y="50" width="165" height="90" class="sankey-node sankey-repeat-node" />
          <text x="802" y="91" class="sankey-title compact-title" text-anchor="middle">
            <tspan x="802" dy="0">Repeat</tspan>
            <tspan x="802" dy="25">update</tspan>
          </text>
        </g>

        <g class="${liveNodeClass("triage_process", activeNode)}">
          <rect x="705" y="230" width="170" height="150" class="sankey-node sankey-triage-node" />
          <text x="790" y="305" class="sankey-title compact-title" text-anchor="middle">
            <tspan x="790" dy="0">Triage</tspan>
            <tspan x="790" dy="25">screen</tspan>
          </text>
        </g>

        ${renderLiveUrgencyNode("U1_immediate_emergency", 1015, 50, "U1", activeNode)}
        ${renderLiveUrgencyNode("U2_same_day_clinical", 1015, 160, "U2", activeNode)}
        ${renderLiveUrgencyNode("U3_routine_clinical", 1015, 270, "U3", activeNode)}
        ${renderLiveUrgencyNode("U4_service_or_admin", 1015, 380, "U4", activeNode)}
        ${renderLiveUrgencyNode("U5_unclear_or_insufficient_info", 1015, 490, "U5", activeNode)}
      </svg>
      `}
    </section>
  `;
}

function renderLiveUrgencyNode(key, x, y, code, activeNode) {
  const className = key.replace(/_.*/, "").toLowerCase();
  return `
    <g class="${urgencyClass(key)} ${liveNodeClass(key, activeNode)}">
      <rect x="${x}" y="${y}" width="140" height="90" class="sankey-node sankey-${className}-node" />
      <text x="${x + 70}" y="${y + 56}" class="sankey-title compact-title" text-anchor="middle">${escapeHtml(code)}</text>
    </g>
  `;
}

function renderUrgencyGuideModal() {
  if (!urgencyGuideOpen) return "";
  const currentUrgency = currentRouteUrgency();

  return `
    <div class="modal-backdrop">
      <section class="urgency-modal" role="dialog" aria-modal="true" aria-labelledby="urgency-guide-title">
        <div class="modal-header">
          <div>
            <h2 id="urgency-guide-title">Martha's Rule triage route</h2>
            <p>Click a pathway or U category for more information.</p>
          </div>
          <button class="btn secondary modal-close" type="button" data-action="close-urgency-guide" aria-label="Close urgency guide">Close</button>
        </div>
        <div class="diagram-wrap">
          ${renderUrgencySankey(currentUrgency)}
        </div>
        <div class="urgency-info-grid">
          <button class="urgency-info-card ${selectedUrgencyGuide === "triage_process" ? "current" : ""}" type="button" data-action="show-urgency-info" data-urgency="triage_process">
            <span>${escapeHtml(triageProcessGuideDetail.code)}</span>
            <strong>${escapeHtml(triageProcessGuideDetail.label)}</strong>
            <em>More information</em>
          </button>
          ${Object.entries(urgencyGuideDetails).map(([key, item]) => `
            <button class="urgency-info-card ${urgencyClass(key)} ${key === (selectedUrgencyGuide || currentUrgency) ? "current" : ""}" type="button" data-action="show-urgency-info" data-urgency="${escapeHtml(key)}">
              <span>${escapeHtml(item.code)}</span>
              <strong>${escapeHtml(item.label)}</strong>
              <em>More information</em>
            </button>
          `).join("")}
        </div>
        ${renderUrgencyDetailPanel(selectedUrgencyGuide || currentUrgency)}
      </section>
    </div>
  `;
}

function renderUrgencySankey(currentUrgency) {
  const useRepeatPath = isRepeatOnlyMode();
  return `
    <svg class="triage-sankey" viewBox="0 0 1180 620" role="img" aria-label="Martha's Rule triage Sankey-style diagram">
      <path class="sankey-flow sankey-main" d="M145 305 C225 305, 250 305, 330 305" />
      <path class="sankey-flow sankey-main ${useRepeatPath ? "sankey-muted" : ""}" d="M480 305 C570 305, 615 305, 705 305" />
      <path class="sankey-flow sankey-repeat ${useRepeatPath ? "" : "sankey-muted"}" d="M480 305 C575 105, 660 90, 720 95" />
      <path class="sankey-flow sankey-repeat ${useRepeatPath ? "" : "sankey-muted"}" d="M802 140 C802 175, 790 200, 790 230" />
      <path class="sankey-flow sankey-u1" d="M860 305 C930 145, 965 105, 1040 95" />
      <path class="sankey-flow sankey-u2" d="M860 305 C940 220, 965 205, 1040 205" />
      <path class="sankey-flow sankey-u3" d="M860 305 C945 305, 965 305, 1040 305" />
      <path class="sankey-flow sankey-u4" d="M860 305 C940 392, 965 415, 1040 415" />
      <path class="sankey-flow sankey-u5" d="M860 305 C930 505, 965 525, 1040 525" />

      <text x="218" y="285" class="sankey-flow-label">Call logged</text>
      <text x="570" y="285" class="sankey-flow-label ${useRepeatPath ? "sankey-muted-label" : ""}">New call: continue to triage</text>
      <text x="570" y="150" class="sankey-flow-label ${useRepeatPath ? "" : "sankey-muted-label"}">Repeat call: update first</text>
      <text x="814" y="190" class="sankey-flow-label ${useRepeatPath ? "" : "sankey-muted-label"}" text-anchor="middle">Then triage</text>
      <text x="900" y="118" class="sankey-route-label">U1 immediate review</text>
      <text x="900" y="222" class="sankey-route-label">U2 urgent review</text>
      <text x="900" y="290" class="sankey-route-label">U3 routine clinical</text>
      <text x="900" y="395" class="sankey-route-label">U4 service/admin</text>
      <text x="900" y="505" class="sankey-route-label">U5 unclear</text>

      <rect x="35" y="245" width="150" height="120" class="sankey-node sankey-start-node" />
      <text x="60" y="292" class="sankey-title">Call received</text>
      <text x="60" y="318" class="sankey-small">Date, time, caller</text>
      <text x="60" y="336" class="sankey-small">and initial details</text>

      <rect x="330" y="245" width="165" height="120" class="sankey-node sankey-repeat-node" />
      <text x="355" y="292" class="sankey-title">Repeat call?</text>
      <text x="355" y="318" class="sankey-small">Same caller within</text>
      <text x="355" y="336" class="sankey-small">24 hours?</text>

      <g class="${useRepeatPath ? "sankey-repeat-current" : ""}">
        <rect x="720" y="50" width="165" height="90" class="sankey-node sankey-repeat-node" />
        <text x="745" y="86" class="sankey-title">Repeat update</text>
        <text x="745" y="112" class="sankey-small">Caller and repeat</text>
        <text x="745" y="130" class="sankey-small">concern details</text>
      </g>

      <g class="sankey-click-node ${selectedUrgencyGuide === "triage_process" ? "current" : ""}" data-action="show-urgency-info" data-urgency="triage_process" role="button" tabindex="0" aria-label="Triage process more information">
        <rect x="705" y="230" width="170" height="150" class="sankey-node sankey-triage-node" />
        <text x="730" y="270" class="sankey-title">Triage screen</text>
        <text x="730" y="296" class="sankey-small">Acute deterioration?</text>
        <text x="730" y="314" class="sankey-small">Warning signs?</text>
        <text x="730" y="332" class="sankey-small">Primary concern?</text>
        <text x="730" y="350" class="sankey-small">Secondary concern?</text>
      </g>

      ${renderUrgencySankeyNode("U1_immediate_emergency", 1015, 50, "U1", ["Immediate", "review"], currentUrgency)}
      ${renderUrgencySankeyNode("U2_same_day_clinical", 1015, 160, "U2", ["Urgent", "review"], currentUrgency)}
      ${renderUrgencySankeyNode("U3_routine_clinical", 1015, 270, "U3", ["Routine", "clinical follow-up"], currentUrgency)}
      ${renderUrgencySankeyNode("U4_service_or_admin", 1015, 380, "U4", ["Service/admin", "signposting"], currentUrgency)}
      ${renderUrgencySankeyNode("U5_unclear_or_insufficient_info", 1015, 490, "U5", ["Unclear or", "manual review"], currentUrgency)}
    </svg>
  `;
}

function renderUrgencySankeyNode(key, x, y, code, lines, currentUrgency) {
  const className = key.replace(/_.*/, "").toLowerCase();
  return `
    <g class="sankey-click-node ${urgencyClass(key)} ${key === currentUrgency ? "current" : ""}" data-action="show-urgency-info" data-urgency="${escapeHtml(key)}" role="button" tabindex="0" aria-label="${escapeHtml(code)} more information">
      <rect x="${x}" y="${y}" width="140" height="90" class="sankey-node sankey-${className}-node" />
      <text x="${x + 25}" y="${y + 34}" class="sankey-title">${escapeHtml(code)}</text>
      <text x="${x + 25}" y="${y + 58}" class="sankey-small">${escapeHtml(lines[0])}</text>
      <text x="${x + 25}" y="${y + 76}" class="sankey-small">${escapeHtml(lines[1])}</text>
    </g>
  `;
}

function renderUrgencyDetailPanel(urgency) {
  if (urgency === "triage_process") return renderTriageAlgorithmPanel();

  const detail = urgencyGuideDetails[urgency];
  if (!detail) return "";

  return `
    <section class="urgency-detail-panel ${urgencyClass(urgency)}" aria-live="polite">
      <div>
        <span>${escapeHtml(detail.code)}</span>
        <h3>${escapeHtml(detail.label)}</h3>
      </div>
      <dl>
        <dt>Use when</dt>
        <dd>${escapeHtml(detail.useWhen)}</dd>
        <dt>Suggested route</dt>
        <dd>${escapeHtml(detail.route)}</dd>
      </dl>
    </section>
  `;
}

function renderTriageAlgorithmPanel() {
  return `
    <section class="triage-algorithm-panel" aria-live="polite">
      <div class="algorithm-heading">
        <span>${escapeHtml(triageProcessGuideDetail.code)}</span>
        <h3>Algorithmic triage view</h3>
      </div>

      <div class="algorithm-flow">
        <article class="algorithm-step">
          <strong>1. Is there acute deterioration now?</strong>
          <p>Ask whether the patient is acutely deteriorating or the caller is unsure.</p>
          <div class="algorithm-branch urgent">If clear warning signs are present: code U1 and route to immediate PERRT / Outreach review.</div>
          <div class="algorithm-branch">If no clear warning signs: continue to primary concern coding.</div>
        </article>

        <article class="algorithm-step">
          <strong>2. Code the primary concern</strong>
          <p>Primary concern means what the call is mainly about. Pick the best parent group, then the specific subcategory.</p>
          <div class="algorithm-columns">
            ${renderAlgorithmGroupDetails(coreConcernGroups)}
          </div>
        </article>

        <article class="algorithm-step">
          <strong>3. Decide clinical review need</strong>
          <p>If the primary concern is clinical, decide whether PERRT needs to see the patient today.</p>
          <div class="algorithm-branch urgent">Yes or unsure: code U2 urgent clinical.</div>
          <div class="algorithm-branch">No: code U3 routine clinical unless the concern is service/admin or unclear.</div>
        </article>

        <article class="algorithm-step">
          <strong>4. Code the secondary concern</strong>
          <p>Secondary concern means why the concern escalated to Martha's Rule.</p>
          <div class="algorithm-columns">
            ${renderAlgorithmGroupDetails(secondaryConcernGroups)}
          </div>
        </article>
      </div>
    </section>
  `;
}

function renderAlgorithmGroupDetails(groups) {
  return Object.values(groups).map((group) => `
    <details class="algorithm-group">
      <summary>${escapeHtml(group.label)}</summary>
      <ul>
        ${Object.values(group.options).map((option) => `<li>${escapeHtml(option)}</li>`).join("")}
      </ul>
    </details>
  `).join("");
}

function renderConcernHelpModal() {
  if (!selectedConcernHelp) return "";
  const detail = concernHelpDetails[selectedConcernHelp];
  if (!detail) return "";

  return `
    <div class="modal-backdrop">
      <section class="concern-help-modal" role="dialog" aria-modal="true" aria-labelledby="concern-help-title">
        <div class="modal-header">
          <div>
            <h2 id="concern-help-title">${escapeHtml(detail.title)}</h2>
            <p>Classification guide</p>
          </div>
          <button class="btn secondary modal-close" type="button" data-action="close-concern-help" aria-label="Close concern help">Close</button>
        </div>
        <div class="concern-help-body">
          <dl>
            <dt>Use when</dt>
            <dd>${escapeHtml(detail.useWhen)}</dd>
            <dt>Example</dt>
            <dd>${escapeHtml(detail.example)}</dd>
          </dl>
        </div>
      </section>
    </div>
  `;
}

function renderEmailPreviewModal() {
  if (!emailPreviewOpen || !state.generatedEmailHtml) return "";
  return `
    <div class="modal-backdrop">
      <section class="email-preview-modal" role="dialog" aria-modal="true" aria-labelledby="email-preview-title">
        <div class="modal-header">
          <div>
            <h2 id="email-preview-title">Automated email preview</h2>
            <p>This is the email outcome that would be cascaded for this triage.</p>
          </div>
          <button class="btn secondary modal-close" type="button" data-action="close-email-preview" aria-label="Close email preview">Close</button>
        </div>
        <div class="email-preview-frame">
          ${state.generatedEmailHtml}
        </div>
        <div class="email-preview-actions">
          <button class="btn secondary" type="button" data-action="close-email-preview">Back to triage</button>
          <button class="btn primary" type="button" data-action="skip-email-open-form">Ready to send this email, open pre-filled form</button>
        </div>
      </section>
    </div>
  `;
}

function summaryRow(label, value) {
  return `<div class="summary-row"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
}

function field(label, path, type = "text", placeholder = "", inputmode = "", maxlength = "") {
  return `
    <label class="field">
      <span>${escapeHtml(label)}</span>
      <input type="${type}" data-bind="${path}" value="${escapeHtml(getPath(path) || "")}" placeholder="${escapeHtml(placeholder)}"${inputmode ? ` inputmode="${escapeHtml(inputmode)}"` : ""}${maxlength ? ` maxlength="${escapeHtml(String(maxlength))}"` : ""} />
    </label>
  `;
}

function textarea(label, path, placeholder = "", size = "") {
  const value = getPath(path) || "";
  return `
    <label class="field ${size === "large" ? "wide" : ""}">
      <span>${escapeHtml(label)}</span>
      <span class="textarea-wrap">
        <textarea data-bind="${path}" maxlength="${FREE_TEXT_LIMIT}" placeholder="${escapeHtml(placeholder)}">${escapeHtml(value)}</textarea>
        <span class="char-counter">${String(value).length}/${FREE_TEXT_LIMIT}</span>
      </span>
    </label>
  `;
}

function selectField(label, path, options, placeholder = "Select an option") {
  const value = getPath(path) || "";
  return `
    <label class="field">
      <span>${escapeHtml(label)}</span>
      <select data-bind="${path}">
        <option value="">${escapeHtml(placeholder)}</option>
        ${options.map(([optionValue, optionLabel]) => `
          <option value="${escapeHtml(optionValue)}" ${value === optionValue ? "selected" : ""}>${escapeHtml(optionLabel)}</option>
        `).join("")}
      </select>
    </label>
  `;
}

function selectArrayField(label, path, options, placeholder = "Select an option") {
  const selected = getPath(path) || [];
  const value = selected[0] || "";
  return `
    <label class="field">
      <span>${escapeHtml(label)}</span>
      <select data-bind="${path}" data-array-single="true">
        <option value="">${escapeHtml(placeholder)}</option>
        ${options.map(([optionValue, optionLabel]) => `
          <option value="${escapeHtml(optionValue)}" ${value === optionValue ? "selected" : ""}>${escapeHtml(optionLabel)}</option>
        `).join("")}
      </select>
    </label>
  `;
}

function datalistField(label, path, options, placeholder = "") {
  const listId = `${path.replace(/\./g, "-")}-list`;
  return `
    <label class="field">
      <span>${escapeHtml(label)}</span>
      <input type="text" data-bind="${path}" value="${escapeHtml(getPath(path) || "")}" placeholder="${escapeHtml(placeholder)}" list="${escapeHtml(listId)}" />
      <datalist id="${escapeHtml(listId)}">
        ${options.map((option) => `<option value="${escapeHtml(option)}"></option>`).join("")}
      </datalist>
    </label>
  `;
}

function radioGroup(label, path, options) {
  const value = getPath(path) || "";
  return `
    <fieldset class="choice-group">
      <legend>${escapeHtml(label)}</legend>
      <div class="choices">
        ${options.map(([optionValue, optionLabel]) => `
          <label class="choice">
            <input type="radio" name="${path}" data-bind="${path}" value="${escapeHtml(optionValue)}" ${value === optionValue ? "checked" : ""} />
            <span>${escapeHtml(optionLabel)}</span>
          </label>
        `).join("")}
      </div>
    </fieldset>
  `;
}

function groupedRadioGroup(label, path, groups) {
  const value = getPath(path) || "";
  return `
    <fieldset class="choice-group grouped-choice-group">
      <legend>${escapeHtml(label)}</legend>
      <div class="choice-sections">
        ${Object.entries(groups).map(([groupKey, group]) => `
          <section class="choice-section" aria-labelledby="${escapeHtml(path)}-${escapeHtml(groupKey)}">
            <h3 id="${escapeHtml(path)}-${escapeHtml(groupKey)}">${escapeHtml(group.label)}</h3>
            <div class="choices">
              ${Object.entries(group.options).map(([optionValue, optionLabel]) => `
                <label class="choice">
                  <input type="radio" name="${path}" data-bind="${path}" value="${escapeHtml(optionValue)}" ${value === optionValue ? "checked" : ""} />
                  <span>${escapeHtml(optionLabel)}</span>
                  ${concernHelpDetails[optionValue] ? `<button class="choice-help" type="button" data-action="show-concern-help" data-concern="${escapeHtml(optionValue)}" aria-label="What does ${escapeHtml(optionLabel)} mean?">?</button>` : ""}
                </label>
              `).join("")}
            </div>
          </section>
        `).join("")}
      </div>
    </fieldset>
  `;
}

function checkboxGroup(label, path, options, exclusiveNone = false) {
  const selected = getPath(path) || [];
  return `
    <fieldset class="choice-group">
      <legend>${escapeHtml(label)}</legend>
      <div class="choices">
        ${options.map(([optionValue, optionLabel]) => `
          <label class="choice">
            <input type="checkbox" data-bind="${path}" data-exclusive-none="${exclusiveNone ? "true" : "false"}" value="${escapeHtml(optionValue)}" ${selected.includes(optionValue) ? "checked" : ""} />
            <span>${escapeHtml(optionLabel)}</span>
          </label>
        `).join("")}
      </div>
    </fieldset>
  `;
}

function groupedCheckboxGroup(label, path, groups) {
  const selected = getPath(path) || [];
  return `
    <fieldset class="choice-group grouped-choice-group">
      <legend>${escapeHtml(label)}</legend>
      <div class="choice-sections">
        ${Object.entries(groups).map(([groupKey, group]) => `
          <section class="choice-section" aria-labelledby="${escapeHtml(path)}-${escapeHtml(groupKey)}">
            <h3 id="${escapeHtml(path)}-${escapeHtml(groupKey)}">${escapeHtml(group.label)}</h3>
            <div class="choices">
              ${Object.entries(group.options).map(([optionValue, optionLabel]) => `
                <label class="choice">
                  <input type="checkbox" data-bind="${path}" data-exclusive-none="false" value="${escapeHtml(optionValue)}" ${selected.includes(optionValue) ? "checked" : ""} />
                  <span>${escapeHtml(optionLabel)}</span>
                  ${concernHelpDetails[optionValue] ? `<button class="choice-help" type="button" data-action="show-concern-help" data-concern="${escapeHtml(optionValue)}" aria-label="What does ${escapeHtml(optionLabel)} mean?">?</button>` : ""}
                </label>
              `).join("")}
            </div>
          </section>
        `).join("")}
      </div>
    </fieldset>
  `;
}

function wardContactLabel(value) {
  if (value === "yes") return "Yes - caller has contacted ward staff";
  if (value === "no") return "No - caller has not yet contacted ward staff";
  if (value === "unable") return "Caller tried but could not reach ward staff";
  if (value === "unsure") return "Unsure / not known";
  return "Not selected";
}

function calculateUrgency() {
  return calculateUrgencyFromCategory(state.triage);
}

function hasSelectedWarningSigns(category) {
  return (category.redFlags || []).some((item) => item !== "none");
}

function shouldAskRedFlags(category) {
  return category.acuteDeterioration === "yes" || category.acuteDeterioration === "unsure";
}

function shouldAutoRouteToPerrt(category) {
  return shouldAskRedFlags(category) && (category.redFlags || []).includes("none");
}

function requiresSameDayReviewQuestion(category) {
  return clinicalCoreConcerns.includes(category.coreConcern) && !shouldAutoRouteToPerrt(category);
}

function calculateUrgencyFromCategory(category) {
  const core = category.coreConcern;
  const hasWarningSigns = hasSelectedWarningSigns(category);

  if (hasWarningSigns) return "U1_immediate_emergency";
  if (shouldAutoRouteToPerrt(category)) return "U2_same_day_clinical";
  if (category.sameDayReview === "yes" || category.sameDayReview === "unsure") return "U2_same_day_clinical";
  if (clinicalCoreConcerns.includes(core)) return "U3_routine_clinical";
  if (serviceCoreConcerns.includes(core)) return "U4_service_or_admin";
  return "U5_unclear_or_insufficient_info";
}

function activeFormCategory() {
  return state.visitLog.recategoriseCall === "yes" ? state.visitLog.callCategory : state.triage;
}

function activeFormUrgency() {
  return calculateUrgencyFromCategory(activeFormCategory());
}

function currentRouteUrgency() {
  return calculateUrgency();
}

function calculateRoute(urgency = calculateUrgency()) {
  if (urgency === "U1_immediate_emergency") return "PERRT/Outreach review";
  if (urgency === "U2_same_day_clinical") return "PERRT/Outreach review";
  if (urgency === "U3_routine_clinical") return "Local ward/team follow-up";
  if (urgency === "U4_service_or_admin") return "Local ward/team service recovery";
  return "Local ward/team manual review";
}

function categoryDisplayLabel(urgency = calculateUrgency()) {
  if (urgency === "U1_immediate_emergency") return "U1 - Emergent";
  if (urgency === "U2_same_day_clinical") return "U2 - Urgent clinical";
  if (urgency === "U3_routine_clinical") return "U3 - Routine clinical";
  if (urgency === "U4_service_or_admin") return "U4 - Service or admin";
  return "U5 - Unclear or insufficient information";
}

function microsoftFormTriageCategoryLabel(urgency = activeFormUrgency()) {
  if (!urgency) return "";
  if (urgency === "U1_immediate_emergency") return "U1 Emergent";
  if (urgency === "U2_same_day_clinical") return "U2 Urgent";
  if (urgency === "U3_routine_clinical") return "U3 Routine Clinical";
  if (urgency === "U4_service_or_admin") return "U4 Service";
  return "U5 Other/Incomplete";
}

function repeatCallTriageFormValue() {
  return microsoftFormTriageCategoryLabel(calculateUrgency());
}

function repeatPrimaryConcernFormValue() {
  return primaryConcernFormValueForCategory(state.triage);
}

function repeatSecondaryConcernFormValue() {
  return secondaryConcernFormValueForCategory(state.triage);
}

function primaryConcernFormValueForCategory(category = activeFormCategory()) {
  return calculateUrgencyFromCategory(category) === "U1_immediate_emergency" ? "U1-skipped" : coreConcernLabels[category.coreConcern] || "";
}

function secondaryConcernFormValueForCategory(category = activeFormCategory()) {
  return calculateUrgencyFromCategory(category) === "U1_immediate_emergency" ? "U1-skipped" : secondaryFormValue(category);
}

function coreConcernMappedFormValueForCategory(category = activeFormCategory()) {
  return calculateUrgencyFromCategory(category) === "U1_immediate_emergency" ? "U1-skipped" : coreConcernFormLabel(category);
}

function triageActionDetail(urgency = calculateUrgency()) {
  if (urgency === "U1_immediate_emergency") {
    return {
      instruction: "This needs to be seen by PERRT/Outreach. Recommended action: Notify PERRT/Outreach local to the concern, hand over the call details, then complete the documentation.",
      phoneNumber: "07464269637",
      callLabel: "PERRT/Outreach",
    };
  }
  if (urgency === "U2_same_day_clinical") {
    return {
      instruction: "This needs urgent clinical review by PERRT/Outreach. Recommended action: Notify PERRT/Outreach local to the concern, hand over the call details, then complete the documentation.",
      phoneNumber: "07464269637",
      callLabel: "PERRT/Outreach",
    };
  }
  if (urgency === "U3_routine_clinical") {
    return {
      instruction: "This should be cascaded to the local ward/team for follow-up, including the relevant manager or matron as appropriate. Complete the documentation after handover.",
      phoneNumber: "",
      callLabel: "",
    };
  }
  if (urgency === "U4_service_or_admin") {
    return {
      instruction: "This should be cascaded to the local ward/team for service recovery or practical follow-up, including the relevant manager or matron as appropriate. Complete the documentation after handover.",
      phoneNumber: "",
      callLabel: "",
    };
  }
  return {
    instruction: "This needs manual review because the information is unclear or insufficient. Cascade to the local ward/team, including the relevant manager or matron as appropriate, and complete the documentation after handover.",
    phoneNumber: "",
    callLabel: "",
  };
}

function urgencyClass(urgency) {
  if (urgency.startsWith("U1")) return "u1";
  if (urgency.startsWith("U2")) return "u2";
  if (urgency.startsWith("U3")) return "u3";
  if (urgency.startsWith("U4")) return "u4";
  return "u5";
}

function calculateCompleteness() {
  if (isRepeatOnlyMode()) {
    return [
      { label: "Call date and phone answer time", done: Boolean(state.callDetails.dateOfReferral && state.callDetails.timePhoneAnswered) },
      { label: "Repeat-call branch answered", done: Boolean(state.callDetails.repeatCall) },
      { label: "Caller type recorded", done: Boolean(state.caller.callerType) },
      { label: "Patient MRN entered", done: Boolean(state.repeatCallUpdate.mrn) },
    { label: "Ward / area entered", done: wardAreaComplete(state.repeatCallUpdate.wardArea, state.repeatCallUpdate.wardAreaOther) },
      { label: "Repeat-call triage completed", done: triageCategoryIsComplete(state.triage) },
      { label: "Reason for repeat contact entered", done: Boolean(state.repeatCallUpdate.additionalInformation) },
    ];
  }

  return [
    { label: "Call date and phone answer time", done: Boolean(state.callDetails.dateOfReferral && state.callDetails.timePhoneAnswered) },
    { label: "Repeat-call branch answered", done: Boolean(state.callDetails.repeatCall) },
    { label: "Caller type recorded", done: Boolean(state.caller.callerType) },
    { label: "Triage questions completed", done: triageCategoryIsComplete(state.triage) },
    { label: "Caller concern summary entered", done: Boolean(state.concernSummary.concernsSummary) },
    { label: "Patient MRN entered", done: Boolean(state.patient.mrn) },
    { label: "Ward / area entered", done: wardAreaComplete(state.location.wardArea, state.location.wardAreaOther) },
    { label: "Triage route generated", done: Boolean(calculateUrgency()) },
  ];
}

function isReadyForPrefilledForm() {
  return calculateCompleteness().every((item) => item.done);
}

function currentTriageMissingFields() {
  const steps = getSteps();
  const current = steps[state.currentStep];
  if (!current || current.id !== "triage") return [];
  return triageCategoryMissingFields(state.triage);
}

function currentVisitLogCategoryMissingFields() {
  const current = visitLogSteps[state.currentVisitStep];
  if (activeTab !== "visitLog" || !current || current.id !== "callCategory" || state.visitLog.recategoriseCall !== "yes") return [];
  return triageCategoryMissingFields(state.visitLog.callCategory);
}

function triageCategoryMissingFields(category) {
  const missing = [];
  const redFlagsRequired = shouldAskRedFlags(category);
  const redFlagsAnswered = !redFlagsRequired || (category.redFlags || []).length > 0;
  const hasAcuteWarningSigns = shouldAskRedFlags(category) && hasSelectedWarningSigns(category);
  const shouldHaveCoreConcern = !hasAcuteWarningSigns && (category.acuteDeterioration === "no" || (shouldAskRedFlags(category) && redFlagsAnswered));
  const hasCoreConcern = Boolean(category.coreConcern);
  const hasSecondary = (category.secondaryFactors || []).length > 0;
  const hasGenuineWorryAnswer = category.genuineWorry === "yes" || category.genuineWorry === "no";
  const shouldHaveSecondary = shouldHaveCoreConcern && hasCoreConcern && (!requiresSameDayReviewQuestion(category) || Boolean(category.sameDayReview));
  const shouldHaveWardContact = shouldHaveSecondary && (hasSecondary || hasGenuineWorryAnswer);

  if (!category.acuteDeterioration) missing.push("acute deterioration question");
  if (redFlagsRequired && !redFlagsAnswered) missing.push("acute warning signs");
  if (shouldHaveCoreConcern && !hasCoreConcern) missing.push("core concern");
  if (requiresSameDayReviewQuestion(category) && !category.sameDayReview) missing.push("PERRT/Outreach review question");
  if (shouldHaveSecondary && !hasSecondary && !hasGenuineWorryAnswer) missing.push("secondary concern or genuine-worry answer");
  if (shouldHaveWardContact && !category.wardContact) missing.push("ward-contact question");

  return missing;
}

function triageCategoryIsComplete(category) {
  return triageCategoryMissingFields(category).length === 0;
}

function blockIncompleteTriageIfNeeded() {
  const missing = currentTriageMissingFields();
  if (!missing.length) return false;
  if (missing.length === 1 && missing[0] === "ward-contact question") {
    wardContactModalOpen = true;
    renderApp();
    return true;
  }
  window.alert(`Please complete the triage questions before continuing: ${missing.join(", ")}.`);
  return true;
}

function blockIncompleteVisitLogCategoryIfNeeded() {
  const missing = currentVisitLogCategoryMissingFields();
  if (!missing.length) return false;
  if (missing.length === 1 && missing[0] === "ward-contact question") {
    wardContactModalOpen = true;
    renderApp();
    return true;
  }
  window.alert(`Please complete the re-triage questions before continuing: ${missing.join(", ")}.`);
  return true;
}

function blockIncompleteCurrentStepIfNeeded() {
  const current = getSteps()[state.currentStep];
  if (!current) return false;
  if (current.id === "triage") return blockIncompleteTriageIfNeeded();
  if (isStepComplete(current.id)) return false;
  window.alert(`Please complete "${current.title}" before continuing.`);
  return true;
}

function blockIncompleteCurrentVisitStepIfNeeded() {
  const current = visitLogSteps[state.currentVisitStep];
  if (!current) return false;
  if (current.id === "callCategory") return blockIncompleteVisitLogCategoryIfNeeded();
  if (isVisitLogStepComplete(current.id)) return false;
  window.alert(`Please complete "${current.title}" before continuing.`);
  return true;
}

function canMoveToStep(targetIndex) {
  const steps = getSteps();
  if (targetIndex <= state.currentStep) return true;
  for (let index = 0; index < targetIndex; index += 1) {
    if (!isStepComplete(steps[index].id)) {
      if (index === state.currentStep) return !blockIncompleteCurrentStepIfNeeded();
      state.currentStep = index;
      window.alert(`Please complete "${steps[index].title}" before moving to a later tab.`);
      if (steps[index].id === "triage") queueTriageQuestionCenter();
      return false;
    }
  }
  return true;
}

function canMoveToVisitStep(targetIndex) {
  if (targetIndex <= state.currentVisitStep) return true;
  for (let index = 0; index < targetIndex; index += 1) {
    if (!isVisitLogStepComplete(visitLogSteps[index].id)) {
      if (index === state.currentVisitStep) return !blockIncompleteCurrentVisitStepIfNeeded();
      state.currentVisitStep = index;
      window.alert(`Please complete "${visitLogSteps[index].title}" before moving to a later tab.`);
      return false;
    }
  }
  return true;
}

function valueOr(value, fallback = "not entered") {
  return value ? value : fallback;
}

function firstOrBlank(values) {
  return values && values.length ? values[0] : "";
}

function quotedValue(value) {
  return JSON.stringify(value || "");
}

function rawValue(value) {
  return value || "";
}

function normalizeCaseCode(value) {
  return String(value || "").replace(/[^a-z0-9]/gi, "").slice(0, 6).toUpperCase();
}

function dateTimeValue(date, time) {
  if (!date || !time) return rawValue(time);
  return `${date}T${time}`;
}

function timeOnlyValue(time) {
  const value = rawValue(time);
  const match = value.match(/(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : value;
}

function quotedIfPresent(value) {
  return value ? JSON.stringify(value) : "";
}

function nestedArrayValue(values, options) {
  if (!values || !values.length) return "";
  return JSON.stringify(JSON.stringify(values.map((value) => optionLabel(options, value))));
}

function acuteBucketLabel() {
  const urgency = calculateUrgency();
  return urgency === "U1_immediate_emergency" ? "Acute Deterioration" : "Non-Acute Deterioration";
}

function secondaryFormValue(category = activeFormCategory()) {
  const factors = listLabels(secondaryFactorOptions, effectiveSecondaryFactors(category));
  return factors === "None selected" ? "" : factors;
}

function effectiveSecondaryFactors(category = activeFormCategory()) {
  return category.secondaryFactors || [];
}

function genuineWorrySummaryLabel(category = activeFormCategory()) {
  if (category.genuineWorry === "yes" && !(category.secondaryFactors || []).length) {
    return "Yes - no secondary concern selected; caller rang out of genuine worry and concern";
  }
  if (category.genuineWorry === "no" && !(category.secondaryFactors || []).length) {
    return "No";
  }
  return "";
}

function normalizeSavedTaxonomy() {
  const coreConcernMap = {
    symptoms: "other_symptom",
    medication: "medication",
    devices_feeding: "medical_device",
    wound_infection: "infection_sepsis",
    neuro_delirium: "neuro_confusion_delirium",
    discharge_aftercare: "discharge_aftercare",
    admin_belongings: "service_access_admin_environment",
    communication_update: "",
    complaint_experience: "",
  };
  const secondaryFactorMap = {
    poor_update_given: "awaiting_update_inadequate_update",
    information_unclear_conflicting: "unclear_confusing_conflicting_information",
    unable_reach_team: "unable_access_right_team_person",
    feels_not_listened_to: "not_listened_to_not_taken_seriously",
    concern_raised_unresolved: "raised_but_unresolved",
  };

  if (Object.prototype.hasOwnProperty.call(coreConcernMap, state.triage.coreConcern)) {
    state.triage.coreConcern = coreConcernMap[state.triage.coreConcern];
  }

  state.triage.secondaryFactors = (state.triage.secondaryFactors || [])
    .map((factor) => secondaryFactorMap[factor] || factor)
    .filter((factor) => secondaryFactorOptions.some(([value]) => value === factor));

  if (state.triage.coreConcern && !coreConcernOptions.some(([value]) => value === state.triage.coreConcern)) {
    state.triage.coreConcern = "";
  }
}

function normalizeWardAreaValues() {
  if (state.location.wardArea && !wardAreaSuggestions.includes(state.location.wardArea)) {
    state.location.wardArea = "";
    state.location.wardAreaOther = "";
  }
  if (state.location.wardArea !== "Other") {
    state.location.wardAreaOther = "";
  }
  if (state.repeatCallUpdate.wardArea && !wardAreaSuggestions.includes(state.repeatCallUpdate.wardArea)) {
    state.repeatCallUpdate.wardArea = "";
    state.repeatCallUpdate.wardAreaOther = "";
  }
  if (state.repeatCallUpdate.wardArea !== "Other") {
    state.repeatCallUpdate.wardAreaOther = "";
  }
  if (state.visitLog.location.wardArea && !wardAreaSuggestions.includes(state.visitLog.location.wardArea)) {
    state.visitLog.location.wardArea = "";
    state.visitLog.location.wardAreaOther = "";
  }
  if (state.visitLog.location.wardArea !== "Other") {
    state.visitLog.location.wardAreaOther = "";
  }
}

function wardAreaDisplayValue(wardArea, otherWardArea) {
  if (wardArea === "Other") return otherWardArea || "Other";
  return wardArea || "";
}

function locationWardAreaDisplayValue() {
  return wardAreaDisplayValue(state.location.wardArea, state.location.wardAreaOther);
}

function visitLogWardAreaDisplayValue() {
  return wardAreaDisplayValue(state.visitLog.location.wardArea, state.visitLog.location.wardAreaOther);
}

function repeatWardAreaDisplayValue() {
  return wardAreaDisplayValue(state.repeatCallUpdate.wardArea, state.repeatCallUpdate.wardAreaOther);
}

function wardAreaComplete(wardArea, otherWardArea) {
  return Boolean(wardArea && (wardArea !== "Other" || otherWardArea));
}

function otherWardRecipientEmailRequired() {
  if (activeTab === "visitLog") return state.visitLog.location.wardArea === "Other";
  if (isRepeatOnlyMode()) return state.repeatCallUpdate.wardArea === "Other";
  return activeTab === "triage" && state.location.wardArea === "Other";
}

function otherWardRecipientEmailValue() {
  if (activeTab === "visitLog") return state.visitLog.notifications.otherEmails || "";
  if (isRepeatOnlyMode()) return state.repeatCallUpdate.otherWardRecipientEmails || "";
  return state.location.otherWardRecipientEmails || "";
}

function otherWardRecipientEmailMissing() {
  return otherWardRecipientEmailRequired() && !otherWardRecipientEmailValue().trim();
}

function noticeRecipientFormValue() {
  const selected = state.triage.noticeRecipients || [];
  if (!selected.length) return "";
  return combineEmailRecipients([MAIN_PERRT_EMAIL, ...selected]);
}

function combineEmailRecipients(values) {
  return values
    .flatMap((value) => String(value || "").split(/[;,]/))
    .map((value) => value.trim())
    .filter(Boolean)
    .join("; ");
}

function triageAdditionalNoticeRecipientValue() {
  return state.location.wardArea === "Other" ? combineEmailRecipients([state.location.otherWardRecipientEmails]) : "";
}

function repeatAdditionalNoticeRecipientValue() {
  return state.repeatCallUpdate.wardArea === "Other" ? combineEmailRecipients([state.repeatCallUpdate.otherWardRecipientEmails]) : "";
}

function delayAnsweringLabel() {
  if (!state.callDetails.delayInAnswering) return "";
  return state.callDetails.delayInAnswering.charAt(0).toUpperCase() + state.callDetails.delayInAnswering.slice(1);
}

function repeatCallLabel() {
  if (!state.callDetails.repeatCall) return "";
  return state.callDetails.repeatCall.charAt(0).toUpperCase() + state.callDetails.repeatCall.slice(1);
}

function learningStatusLabel() {
  const status = state.visitLog.actionsOutcomes.learningIdentified;
  if (status === "pending") return "Pending";
  if (!status) return "";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function sameDayReviewFormLabel(category = activeFormCategory()) {
  if (hasSelectedWarningSigns(category)) return "Yes - automatically routed because acute warning signs were selected";
  if (shouldAutoRouteToPerrt(category)) return "Yes - automatically routed because acute deterioration was selected";
  if (!category.sameDayReview) return "";
  if (category.sameDayReview === "yes") return "Yes";
  if (category.sameDayReview === "no") return "No";
  if (category.sameDayReview === "unsure") return "Unsure";
  return "";
}

function callerTypeFormLabel() {
  return optionLabel(callerTypeOptions, state.caller.callerType || "");
}

function warningSignsFormDetail(category = activeFormCategory()) {
  const warningSigns = (category.redFlags || []).filter((item) => item !== "none");
  if (!warningSigns.length) return "No warning signs selected";
  const labels = warningSigns.map((value) => optionLabel(redFlagOptions, value));
  if (category.otherRedFlagText) labels.push(`Other detail: ${category.otherRedFlagText}`);
  return labels.join(" | ");
}

function categoryOfCallLabel(category = activeFormCategory()) {
  const isAcute = category.acuteDeterioration === "yes" || category.acuteDeterioration === "unsure" || hasSelectedWarningSigns(category);
  if (!isAcute) return "Non-Acute Deterioration";
  return `Acute Deterioration; Warning signs=${warningSignsFormDetail(category)}`;
}

function coreConcernFormLabel(category = activeFormCategory()) {
  const core = category.coreConcern;
  const secondaryFactors = category.secondaryFactors || [];
  const hasCommunicationIssue = secondaryFactors.some((factor) => [
    "awaiting_update_inadequate_update",
    "unclear_confusing_conflicting_information",
    "unable_access_right_team_person",
    "not_listened_to_not_taken_seriously",
    "unmet_expectations_disagreement_plan",
    "negative_interaction_with_staff",
    "raised_but_unresolved",
  ].includes(factor));
  const hasDelayIssue = secondaryFactors.includes("delay_in_response_or_action");

  if (core === "medication") return "Medication issue or delay";
  if (core === "other_treatment" && hasDelayIssue) return "Delayed investigations";
  if (hasCommunicationIssue) return "Communication issue";
  if (core === "other_unclear") return "signpost to another clinical service or team";
  if (core === "discharge_aftercare") return "Discharge planning";
  if (serviceCoreConcerns.includes(core)) return "Non-clinical concern";
  if (!core) return "";
  return "Clinical concern/management of a long term condition";
}

function nhseNonAcuteCategoryFormValue(category = activeFormCategory()) {
  const core = category.coreConcern;
  const secondaryFactors = category.secondaryFactors || [];
  const communicationFactors = [
    "awaiting_update_inadequate_update",
    "unclear_confusing_conflicting_information",
    "unable_access_right_team_person",
    "not_listened_to_not_taken_seriously",
    "unmet_expectations_disagreement_plan",
    "negative_interaction_with_staff",
    "raised_but_unresolved",
  ];

  if (core === "medication") return "Medication issue or delay";
  if (core === "discharge_aftercare") return "Discharge planning";
  if (serviceCoreConcerns.includes(core)) return "Non-clinical concern";
  if (core === "other_unclear") return "signpost to another clinical service or team";
  if (secondaryFactors.includes("delay_in_response_or_action") && core === "other_treatment") return "Delayed investigations";
  if (secondaryFactors.some((factor) => communicationFactors.includes(factor))) return "Communication issue";
  if (clinicalCoreConcerns.includes(core) || category.genuineWorry === "yes") return "Clinical concern/management of a long term condition";
  return "";
}

function notificationFormValue() {
  const defaults = "Managers; Matrons";
  const additional = additionalNotificationFormValue();
  return additional ? `${defaults}; ${additional}` : defaults;
}

function additionalNotificationFormValue() {
  return state.visitLog.notifications.otherEmails || "";
}

function buildVisitLogMicrosoftFormParams() {
  const visit = state.visitLog;
  const recategorised = visit.recategoriseCall === "yes";
  const category = visit.callCategory;
  const urgency = calculateUrgencyFromCategory(category);

  return [
    ["r31846d6fb07d4d018cab96bd944b9382", rawValue(state.patient.mrn)],
    ["r7f3b043cf0334f46b0810e1ec98aaca8", rawValue(state.patient.ethnicGroup)],
    ["rd353a0b8965b4712bff46796a92b95e1", rawValue(visitLogWardAreaDisplayValue())],
    ["r68acc9216406417388bae3097858f053", rawValue(state.visitLog.location.bedNumber)],
    [VISIT_LOG_CASE_CODE_MICROSOFT_FORM_FIELD, rawValue(visit.clinicalAssessment.caseCode)],
    ["rd431036de5924ee8afced05b4f9468c2", rawValue(visit.dateOfVisit)],
    ["r6588c785ac6f44cabecf1da9f7aa5349", rawValue(visit.timeOfAttendance)],
    ["r1fc97779b4d142f989ae5d8a20a6ac2f", rawValue(visit.clinicalAssessment.news2AtCall)],
    ["reaf9da4d644e4fe481f2befa4217af0b", rawValue(visit.clinicalAssessment.news2AtAttendance)],
    ["rcb400c101465426e95449e561c7779f2", rawValue(visit.clinicalAssessment.additionalClinicalNotes)],
    ["rfa0ba739b2f4401abc074e9102d0b577", rawValue(listLabels(perrtActionOptions, visit.actionsOutcomes.perrtActionsTaken))],
    ["r3c178764b7944d7c95fce3edf420c312", rawValue(visit.actionsOutcomes.totalTimeSpent)],
    ["r2df5359dadfb454aa84e92e0bf4a8d4d", rawValue(listLabels(outcomeOptions, visit.actionsOutcomes.outcomes))],
    ["rd75b3a4e7ab64edbb7c969384df2afb0", rawValue(visit.recategoriseCall ? optionLabel([["yes", "Yes"], ["no", "No"]], visit.recategoriseCall) : "")],
    ["r4d615b32ea00433aa573259ba885efed", rawValue(recategorised ? categoryDisplayLabel(urgency) : "")],
    ["rbcfd3847dd5c423a897afeebebc96d08", rawValue(recategorised ? categoryOfCallLabel(category) : "")],
    ["rc252f81b20fd4c7eb20b15215d8b4ec8", rawValue(recategorised ? coreConcernMappedFormValueForCategory(category) : "")],
    ["r9ed4f7e2948341f18a7657f047c76244", rawValue(recategorised ? nhseNonAcuteCategoryFormValue(category) : "")],
    ["r367218e041e04b7d8f4c0eb6deb5742d", rawValue(recategorised ? secondaryConcernFormValueForCategory(category) : "")],
    ["r7a51fb7c102c46e6914d226ac905af84", rawValue(recategorised ? wardContactLabel(category.wardContact) : "")],
    ["r26f151b8d3a943b3a074bf3cf938d3e2", rawValue(learningStatusLabel())],
    ["raadbf318f8fb47d4b3d82fd4eb37746c", rawValue(visit.actionsOutcomes.learningTheme)],
    ["rd344948baaac4862ac4285b80386f731", rawValue(visit.actionsOutcomes.feedbackLearningNotes)],
    ["rc0f29b4c501f453ea14003d755d6bb22", rawValue(additionalNotificationFormValue())],
  ];
}

function buildMicrosoftFormUrl() {
  const isVisitLogForm = activeTab === "visitLog";
  const url = new URL(isVisitLogForm ? VISIT_LOG_MICROSOFT_FORM_BASE : isRepeatOnlyMode() ? REPEAT_CALL_MICROSOFT_FORM_BASE : TRIAGE_MICROSOFT_FORM_BASE);
  const category = activeFormCategory();
  const repeatNeedsNewTriage = isRepeatOnlyMode();
  const params = isVisitLogForm ? buildVisitLogMicrosoftFormParams() : isRepeatOnlyMode() ? [
    ["rff640b50907e4142a1e360afb33e371f", quotedIfPresent(state.callDetails.dateOfReferral)],
    ["re2b4e9868e8942ff83bf8d2b484c69c4", timeOnlyValue(state.callDetails.timePhoneAnswered)],
    ["ref35f99c7c104e08a9af944152a0a5e8", rawValue(state.repeatCallUpdate.mrn)],
    ["r6d09e72e812240b391120a05fb35a6f6", rawValue(repeatWardAreaDisplayValue())],
    ["r921b163e08504719a2ed5d8f3c6f2c5a", rawValue(repeatAdditionalNoticeRecipientValue())],
    ["re1d84546055d436387419c3cb7a47bb2", rawValue(state.repeatCallUpdate.bedNumber)],
    ["r01e81a35b1e24e57a307587bab42889b", rawValue(state.repeatCallUpdate.additionalInformation)],
    ["r8aab0291954d4b8684b369e5d12f676a", rawValue(repeatNeedsNewTriage ? categoryOfCallLabel(state.triage) : "")],
    ["rf36cd4f03a7546cb9200d7ee9bb2e376", rawValue(repeatCallTriageFormValue())],
    ["rb37f628fa1df45509b9f815070bd75ea", rawValue(repeatNeedsNewTriage ? nhseNonAcuteCategoryFormValue(state.triage) : "")],
    ["r44e90607199444148433fa44cbf58d03", rawValue(noticeRecipientFormValue())],
    ["r816d6d1b2ee44cc9a8dbb1f35fe4ac52", rawValue(repeatNeedsNewTriage ? repeatPrimaryConcernFormValue() : "")],
    ["rb7b9a0f743644c7ea5d74c1432bacc01", rawValue(repeatNeedsNewTriage ? repeatSecondaryConcernFormValue() : "")],
    ["r2ad6783656c3484383ac51ccbcf951bc", rawValue(repeatNeedsNewTriage ? wardContactLabel(state.triage.wardContact) : "")],
    ["r0369039bf69e471c8fcf2908c5c29f08", quotedIfPresent(callerTypeFormLabel())],
    ["r0d0af8d8e7a8434c83ae750e5ac84b7d", quotedIfPresent(delayAnsweringLabel())],
  ] : [
    ["re469facce77445b4b414e2fdeb7d1479", quotedIfPresent(state.callDetails.dateOfReferral)],
    ["r4e0568f047ea4b139191076ec5fb6af4", timeOnlyValue(state.callDetails.timePhoneAnswered)],
    ["r858d5537b5764dbeb0ebcaeb54458c13", quotedIfPresent(delayAnsweringLabel())],
    ["r8ae8781c12db4d1d88b2da8f85c1f304", quotedIfPresent(repeatCallLabel())],
    ["re6f51d7f48554504b0b653e046e0f290", rawValue(state.patient.mrn)],
    ["rc7606d943eca4d3aaf6299e67889b35e", quotedIfPresent(state.patient.dob)],
    ["r7c50a5f896d641ee9c7d891a3283b498", quotedIfPresent(state.patient.gender)],
    ["r3c3d412082c743c0a6596f0e7db6368a", quotedIfPresent(state.patient.ethnicGroup)],
    ["r8263369d8bdc4f1aaefac81951e9a93a", quotedIfPresent(
      state.patient.learningDisabilityNeurodiversity === "not_known" ? "Not known" :
      state.patient.learningDisabilityNeurodiversity ? state.patient.learningDisabilityNeurodiversity.charAt(0).toUpperCase() + state.patient.learningDisabilityNeurodiversity.slice(1) : ""
    )],
    ["r66cf613485964d4383c8aa51890fcf75", quotedIfPresent(state.location.wardArea)],
    ["r3926d94057ed4eb692e68975f7cc60d0", rawValue(state.location.wardArea === "Other" ? state.location.wardAreaOther : "")],
    ["rc9b9ef7e4d044b2e9586f9a4918e16f3", rawValue(triageAdditionalNoticeRecipientValue())],
    ["r5242c93b6153469a955a18eef845b123", rawValue(state.location.bedNumber)],
    ["rd5eb8fd12c3b4820a98be63071b7aa45", quotedIfPresent(state.location.specialtyMedicalTeam)],
    ["re71f380f7f854a7d89d4b259a20fa59b", quotedIfPresent(callerTypeFormLabel())],
    ["ra65e5273f8334f57bd4353404b4d74d1", quotedIfPresent(categoryOfCallLabel(category))],
    ["ra149b074a6c3473a9b8013202182b297", quotedIfPresent(microsoftFormTriageCategoryLabel(activeFormUrgency()))],
    ["rcebd38d3d563434fb16f86c0316377c6", quotedIfPresent(coreConcernMappedFormValueForCategory(category))],
    ["rff487e35c7034b4199c9e5e05f1a1d9b", rawValue(nhseNonAcuteCategoryFormValue(category))],
    ["r78896ccbec904d53a48753318de935e2", rawValue(noticeRecipientFormValue())],
    ["r39f66a7d3a6e490ca8cb00c92e987f42", rawValue(categoryOfCallLabel(category))],
    ["r07a6bc2130884fbdab35c6a9771103f6", rawValue(primaryConcernFormValueForCategory(category))],
    ["r2a55ea2436a747179be777730d105534", quotedIfPresent(sameDayReviewFormLabel(category))],
    ["r267fb377cf3f4dde8589f7163ac990ad", rawValue(secondaryConcernFormValueForCategory(category))],
    ["r23794c7a44244c0fb226d486388fd7d2", rawValue(wardContactLabel(category.wardContact))],
    ["rbf815cbaa1c240c3a6bb0b3da063d843", rawValue(state.concernSummary.concernsSummary)],
  ];

  params.forEach(([key, value]) => {
    if (value !== "") url.searchParams.set(key, value);
  });

  return url.toString().replace(/\+/g, "%20");
}

function openPrefilledMicrosoftForm() {
  if (activeTab === "triage" && !isReadyForPrefilledForm()) {
    const missing = calculateCompleteness().filter((item) => !item.done).map((item) => item.label);
    window.alert(`Please complete the required call triage fields before opening the form: ${missing.join(", ")}.`);
    return;
  }
  if (otherWardRecipientEmailRequired()) {
    otherWardEmailModalOpen = true;
    otherWardEmailOpenFormAfterSave = true;
    renderApp();
    return;
  }
  if (activeTab !== "visitLog") {
    openNoticeRecipientModalWithAnimation();
    return;
  }
  window.open(buildMicrosoftFormUrl(), "_blank", "noopener,noreferrer");
}

function openPrefilledMicrosoftFormWithoutPrompt() {
  if (activeTab === "triage" && !isReadyForPrefilledForm()) {
    const missing = calculateCompleteness().filter((item) => !item.done).map((item) => item.label);
    window.alert(`Please complete the required call triage fields before opening the form: ${missing.join(", ")}.`);
    return;
  }
  if (otherWardRecipientEmailRequired()) {
    otherWardEmailModalOpen = true;
    otherWardEmailOpenFormAfterSave = true;
    renderApp();
    return;
  }
  if (activeTab !== "visitLog") {
    openNoticeRecipientModalWithAnimation();
    return;
  }
  window.open(buildMicrosoftFormUrl(), "_blank", "noopener,noreferrer");
}

function generateStructuredSummary() {
  if (isRepeatOnlyMode()) {
    const triageCode = repeatCallTriageFormValue();
    const triageSummary = `The repeat-call triage code was assigned through triage guidance as ${triageCode || "not selected"}.`;
    state.generatedSummary = `This is a repeat Martha's Rule call received on ${valueOr(state.callDetails.dateOfReferral)} at ${valueOr(state.callDetails.timePhoneAnswered)} by a caller recorded as ${valueOr(callerTypeFormLabel(), "not selected")}. The patient is recorded as MRN ${valueOr(state.repeatCallUpdate.mrn)}, located on ${valueOr(repeatWardAreaDisplayValue())}${state.repeatCallUpdate.bedNumber ? `, bed ${state.repeatCallUpdate.bedNumber}` : ""}. The reason the caller contacted the phoneline again was: ${valueOr(state.repeatCallUpdate.additionalInformation)}. ${triageSummary}`;
    state.generatedSummaryHtml = buildStructuredSummaryHtml();
    return;
  }

  if (activeTab === "visitLog") {
    const visit = state.visitLog;
    const recategorised = visit.recategoriseCall === "yes";
    const category = visit.callCategory;
    const categoryText = recategorised
      ? `The call was re-categorised as ${categoryDisplayLabel(calculateUrgencyFromCategory(category))}. Category detail: ${categoryOfCallLabel(category)}. Core concern: ${primaryConcernFormValueForCategory(category) || "not entered"}. Secondary concern: ${secondaryConcernFormValueForCategory(category) || "not entered"}. Ward contact status: ${wardContactLabel(category.wardContact)}.`
      : `The call was not re-categorised in this visit log.`;

    state.generatedSummary = `Martha's Rule call visit log${visit.clinicalAssessment.caseCode ? ` for 6-digit code ${visit.clinicalAssessment.caseCode}` : ""} for MRN ${valueOr(state.patient.mrn)}, located on ${valueOr(visitLogWardAreaDisplayValue())}${state.visitLog.location.bedNumber ? `, bed ${state.visitLog.location.bedNumber}` : ""}. Ethnic group recorded as ${valueOr(state.patient.ethnicGroup)}. Date of visit was ${valueOr(visit.dateOfVisit)} and PERRT/Outreach attendance time was ${valueOr(visit.timeOfAttendance)}.

Clinical assessment: NEWS2 at time of call was ${valueOr(visit.clinicalAssessment.news2AtCall)} and NEWS2 at attendance was ${valueOr(visit.clinicalAssessment.news2AtAttendance)}. Additional clinical notes: ${valueOr(visit.clinicalAssessment.additionalClinicalNotes)}.

Actions and outcomes: Actions taken were ${listLabels(perrtActionOptions, visit.actionsOutcomes.perrtActionsTaken)}. Outcome recorded: ${listLabels(outcomeOptions, visit.actionsOutcomes.outcomes)}. Total time spent managing the concern was ${valueOr(visit.actionsOutcomes.totalTimeSpent)} hour(s).

Call category: ${categoryText}

Learning and notifications: Learning status was ${valueOr(learningStatusLabel(), "not selected")}${visit.actionsOutcomes.learningTheme ? `, theme: ${visit.actionsOutcomes.learningTheme}` : ""}. Feedback / learning notes: ${valueOr(visit.actionsOutcomes.feedbackLearningNotes)}. Default notification recipients are managers and matrons.`;
    state.generatedSummaryHtml = buildVisitLogStructuredSummaryHtml();
    return;
  }

  const originalUrgency = calculateUrgency();
  const urgency = activeFormUrgency();
  const route = calculateRoute(urgency);
  const action = triageActionDetail(urgency);
  const category = activeFormCategory();
  const exportedWardArea = activeTab === "visitLog" ? visitLogWardAreaDisplayValue() : locationWardAreaDisplayValue();
  const exportedBedNumber = activeTab === "visitLog" ? state.visitLog.location.bedNumber : state.location.bedNumber;
  const callerType = state.caller.callerType ? state.caller.callerType.replace(/_/g, "-") : "not selected";
  const concern = primaryConcernFormValueForCategory(category) || "not selected";
  const secondaryConcerns = listLabels(secondaryFactorOptions, effectiveSecondaryFactors(category));
  const patientDetails = `MRN ${valueOr(state.patient.mrn)}, date of birth ${valueOr(state.patient.dob)}, gender ${valueOr(state.patient.gender)}, ethnic group ${valueOr(state.patient.ethnicGroup)}, learning disability/neurodiversity status ${valueOr(state.patient.learningDisabilityNeurodiversity)}`;
  const locationDetails = `${valueOr(locationWardAreaDisplayValue())}${state.location.bedNumber ? `, bed ${state.location.bedNumber}` : ""}, under ${valueOr(state.location.specialtyMedicalTeam)}`;
  const visit = state.visitLog;
  const hasVisitLog = Boolean(
    visit.dateOfVisit ||
    visit.timeOfAttendance ||
    visit.clinicalAssessment.news2AtCall ||
    visit.clinicalAssessment.news2AtAttendance ||
    visit.clinicalAssessment.additionalClinicalNotes ||
    visit.actionsOutcomes.perrtActionsTaken.length ||
    visit.actionsOutcomes.totalTimeSpent ||
    visit.actionsOutcomes.outcomes.length ||
    visit.actionsOutcomes.learningIdentified ||
    visit.notifications.otherEmails
  );

  state.generatedSummary = `A Martha's Rule call was answered on ${valueOr(state.callDetails.dateOfReferral)} at ${valueOr(state.callDetails.timePhoneAnswered)} by a caller recorded as ${callerType}. Repeat-call status was ${valueOr(state.callDetails.repeatCall, "not selected")}. The patient details recorded were ${patientDetails}. The patient was located at ${locationDetails}.

Category: ${categoryDisplayLabel(urgency)}${state.visitLog.recategoriseCall === "yes" ? ` (re-categorised in visit log from ${categoryDisplayLabel(originalUrgency)})` : ""}. Suggested route: ${route}. Recommended action: ${action.instruction}

The core concern was ${concern}. Red flags recorded: ${listLabels(redFlagOptions, category.redFlags)}${category.otherRedFlagText ? `; other warning sign: ${category.otherRedFlagText}` : ""}. Secondary concerns recorded: ${secondaryConcerns}. ${genuineWorrySummaryLabel(category) ? `Genuine worry follow-up: ${genuineWorrySummaryLabel(category)}. ` : ""}Ward contact status was ${wardContactLabel(category.wardContact)}.

The caller's main concern was summarised as: ${valueOr(state.concernSummary.concernsSummary)}.${hasVisitLog ? `

Visit log: Date of visit was ${valueOr(visit.dateOfVisit)}. PERRT/Outreach attendance time was ${valueOr(visit.timeOfAttendance)}. NEWS2 at call was ${valueOr(visit.clinicalAssessment.news2AtCall)} and NEWS2 at attendance was ${valueOr(visit.clinicalAssessment.news2AtAttendance)}. Additional clinical notes: ${valueOr(visit.clinicalAssessment.additionalClinicalNotes)}. Actions taken: ${listLabels(perrtActionOptions, visit.actionsOutcomes.perrtActionsTaken)}. Outcomes recorded: ${listLabels(outcomeOptions, visit.actionsOutcomes.outcomes)}. Total time spent was ${valueOr(visit.actionsOutcomes.totalTimeSpent)} hour(s). Learning status was ${valueOr(learningStatusLabel(), "not selected")}${visit.actionsOutcomes.learningTheme ? `, theme: ${visit.actionsOutcomes.learningTheme}` : ""}. Feedback / learning notes: ${valueOr(visit.actionsOutcomes.feedbackLearningNotes)}. Notification recipients: ${notificationFormValue()}.` : ""}`;
  state.generatedSummaryHtml = buildStructuredSummaryHtml();
}

function summaryCell(value, fallback = "Not entered") {
  return escapeHtml(value || fallback);
}

function summaryRowHtml(label, value) {
  return `
      <tr>
        <td style="width:34%; padding:8px 10px; border:1px solid #cbd5e1; font-weight:700; background:#f8fafc; vertical-align:top;">${summaryCell(label, "")}</td>
        <td style="padding:8px 10px; border:1px solid #cbd5e1; vertical-align:top;">${summaryCell(value)}</td>
      </tr>`;
}

function summarySectionHtml(title, rows) {
  return `
    <h3 style="margin:14px 0 6px; color:#005E5C; font-size:15px;">${summaryCell(title, "")}</h3>
    <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; width:100%; font-size:13px; margin:0 0 10px;">
      <tbody>${rows.join("")}
      </tbody>
    </table>`;
}

function buildStructuredSummaryHtml() {
  if (isRepeatOnlyMode()) {
    const triageValue = repeatCallTriageFormValue();
    return `
      <div style="font-family:Arial, Helvetica, sans-serif; color:#111827; line-height:1.35;">
        <h2 style="margin:0 0 8px; color:#003F3D; font-size:18px;">Martha's Rule Repeat Call Summary</h2>
        ${summarySectionHtml("Call Details", [
          summaryRowHtml("Date of call", formatDateForEmail(state.callDetails.dateOfReferral)),
          summaryRowHtml("Time phone answered", state.callDetails.timePhoneAnswered),
          summaryRowHtml("Delay in answering", delayAnsweringLabel()),
          summaryRowHtml("Who made the call?", callerTypeFormLabel()),
        ])}
        ${summarySectionHtml("Patient and Location", [
          summaryRowHtml("MRN number", state.repeatCallUpdate.mrn),
        summaryRowHtml("Ward / Area", repeatWardAreaDisplayValue()),
          summaryRowHtml("Bed number", state.repeatCallUpdate.bedNumber),
        ])}
        ${summarySectionHtml("Repeat Call Details", [
          summaryRowHtml("Why has the caller contacted the phoneline again?", state.repeatCallUpdate.additionalInformation),
          summaryRowHtml("Triage method", "Triage guidance"),
          summaryRowHtml("Repeat-call triage category", triageValue),
        ])}
      </div>`;
  }

  if (activeTab === "visitLog") return buildVisitLogStructuredSummaryHtml();

  const urgency = activeFormUrgency();
  const category = activeFormCategory();
  const visit = state.visitLog;
  const hasVisitLog = Boolean(
    visit.dateOfVisit ||
    visit.timeOfAttendance ||
    visit.clinicalAssessment.news2AtCall ||
    visit.clinicalAssessment.news2AtAttendance ||
    visit.clinicalAssessment.additionalClinicalNotes ||
    visit.actionsOutcomes.perrtActionsTaken.length ||
    visit.actionsOutcomes.totalTimeSpent ||
    visit.actionsOutcomes.outcomes.length ||
    visit.actionsOutcomes.learningIdentified ||
    visit.notifications.otherEmails
  );

  return `
    <div style="font-family:Arial, Helvetica, sans-serif; color:#111827; line-height:1.35;">
      <h2 style="margin:0 0 8px; color:#003F3D; font-size:18px;">Martha's Rule Call Triage Summary</h2>
      ${summarySectionHtml("Call Details", [
        summaryRowHtml("Date of call", formatDateForEmail(state.callDetails.dateOfReferral)),
        summaryRowHtml("Time phone answered", state.callDetails.timePhoneAnswered),
        summaryRowHtml("Delay in answering", delayAnsweringLabel()),
        summaryRowHtml("Repeat call", repeatCallLabel()),
        summaryRowHtml("Who made the call?", callerTypeFormLabel()),
      ])}
      ${summarySectionHtml("Patient and Location", [
        summaryRowHtml("MRN number", state.patient.mrn),
        summaryRowHtml("Date of birth", formatDateForEmail(state.patient.dob)),
        summaryRowHtml("Gender", state.patient.gender),
        summaryRowHtml("Ethnic group", state.patient.ethnicGroup),
        summaryRowHtml("Learning Disability or Neurodiversity", state.patient.learningDisabilityNeurodiversity),
        summaryRowHtml("Ward / Area", visitLogWardAreaDisplayValue()),
        summaryRowHtml("Bed number", state.visitLog.location.bedNumber),
        summaryRowHtml("Specialty / Medical team", state.location.specialtyMedicalTeam),
      ])}
      ${summarySectionHtml("Caller Concern", [
        summaryRowHtml("Main reason for call", primaryConcernFormValueForCategory(category)),
        summaryRowHtml("Caller concern summary", state.concernSummary.concernsSummary),
        summaryRowHtml("Red flags recorded", listLabels(redFlagOptions, category.redFlags)),
        summaryRowHtml("Other warning sign", category.otherRedFlagText),
        summaryRowHtml("Why did the caller use the phoneline?", secondaryConcernFormValueForCategory(category)),
        summaryRowHtml("Genuine worry follow-up", genuineWorrySummaryLabel(category)),
        summaryRowHtml("Has the caller spoken to the ward?", wardContactLabel(category.wardContact)),
      ])}
      ${summarySectionHtml("Triage Output", [
        summaryRowHtml("Assigned urgency category", categoryDisplayLabel(urgency)),
        summaryRowHtml("Suggested route", calculateRoute(urgency)),
        summaryRowHtml("Recommended action", triageActionDetail(urgency).instruction),
        summaryRowHtml("Category of call", categoryOfCallLabel(category)),
        summaryRowHtml("Does PERRT need to see this patient?", sameDayReviewFormLabel(category)),
      ])}
      ${hasVisitLog ? summarySectionHtml("Visit Log", [
        summaryRowHtml("Date of visit", formatDateForEmail(visit.dateOfVisit)),
        summaryRowHtml("6-digit code", visit.clinicalAssessment.caseCode),
        summaryRowHtml("Time of PERRT/Outreach attendance", visit.timeOfAttendance),
        summaryRowHtml("NEWS2 at time of call", visit.clinicalAssessment.news2AtCall),
        summaryRowHtml("NEWS2 at time of attendance", visit.clinicalAssessment.news2AtAttendance),
        summaryRowHtml("Additional clinical notes", visit.clinicalAssessment.additionalClinicalNotes),
        summaryRowHtml("PERRT actions taken", listLabels(perrtActionOptions, visit.actionsOutcomes.perrtActionsTaken)),
        summaryRowHtml("Outcomes recorded", listLabels(outcomeOptions, visit.actionsOutcomes.outcomes)),
        summaryRowHtml("Total time spent managing concern [hours]", visit.actionsOutcomes.totalTimeSpent),
        summaryRowHtml("Learning status", learningStatusLabel()),
        summaryRowHtml("Learning theme", visit.actionsOutcomes.learningTheme),
        summaryRowHtml("Feedback / learning notes", visit.actionsOutcomes.feedbackLearningNotes),
        summaryRowHtml("Notification recipients", notificationFormValue()),
      ]) : ""}
    </div>`;
}

function buildVisitLogStructuredSummaryHtml() {
  const visit = state.visitLog;
  const recategorised = visit.recategoriseCall === "yes";
  const category = visit.callCategory;
  const urgency = calculateUrgencyFromCategory(category);

  return `
    <div style="font-family:Arial, Helvetica, sans-serif; color:#111827; line-height:1.35;">
      <h2 style="margin:0 0 8px; color:#003F3D; font-size:18px;">Martha's Rule Call Visit Log Summary</h2>
      ${summarySectionHtml("Attendance and Clinical Assessment", [
        summaryRowHtml("6-digit code", visit.clinicalAssessment.caseCode),
        summaryRowHtml("MRN number", state.patient.mrn),
        summaryRowHtml("Ethnic group", state.patient.ethnicGroup),
        summaryRowHtml("Ward / Area", visitLogWardAreaDisplayValue()),
        summaryRowHtml("Bed number", state.visitLog.location.bedNumber),
        summaryRowHtml("Date of visit", formatDateForEmail(visit.dateOfVisit)),
        summaryRowHtml("Time of PERRT/Outreach attendance", visit.timeOfAttendance),
        summaryRowHtml("NEWS2 at time of call", visit.clinicalAssessment.news2AtCall),
        summaryRowHtml("NEWS2 at time of attendance", visit.clinicalAssessment.news2AtAttendance),
        summaryRowHtml("Additional clinical notes", visit.clinicalAssessment.additionalClinicalNotes),
      ])}
      ${summarySectionHtml("Actions and Outcomes", [
        summaryRowHtml("PERRT actions taken", listLabels(perrtActionOptions, visit.actionsOutcomes.perrtActionsTaken)),
        summaryRowHtml("Total time spent managing concern [hours]", visit.actionsOutcomes.totalTimeSpent),
        summaryRowHtml("Outcome of call", listLabels(outcomeOptions, visit.actionsOutcomes.outcomes)),
      ])}
      ${summarySectionHtml("Call Category", [
        summaryRowHtml("Re-categorised", visit.recategoriseCall ? optionLabel([["yes", "Yes"], ["no", "No"]], visit.recategoriseCall) : ""),
        ...(recategorised ? [
          summaryRowHtml("Re-categorised urgency category", categoryDisplayLabel(urgency)),
          summaryRowHtml("Category of call detail", categoryOfCallLabel(category)),
          summaryRowHtml("Core concern", primaryConcernFormValueForCategory(category)),
          summaryRowHtml("Secondary concern", secondaryConcernFormValueForCategory(category)),
          summaryRowHtml("Has the caller spoken to the ward?", wardContactLabel(category.wardContact)),
        ] : []),
      ])}
      ${summarySectionHtml("Learning and Notifications", [
        summaryRowHtml("Learning identified", learningStatusLabel()),
        summaryRowHtml("Learning theme", visit.actionsOutcomes.learningTheme),
        summaryRowHtml("Feedback / learning notes", visit.actionsOutcomes.feedbackLearningNotes),
        summaryRowHtml("Default notification recipients", "Managers; Matrons"),
      ])}
    </div>`;
}

function formatDateForEmail(value) {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

function emailCell(value, fallback = "") {
  return escapeHtml(value || fallback);
}

function emailRow(label, value, shaded = false, options = {}) {
  const cellStyle = options.vertical ? "vertical-align:top;" : "";
  const valueStyle = options.strong ? "font-weight:700;" : "";
  const wrapStyle = options.wrap ? "white-space:pre-wrap;" : "";
  return `
                                      <tr${shaded ? ' style="background:#F7FBFB;"' : ""}>
                                        <td style="padding:10px 12px; font-weight:700; ${cellStyle} border-top:1px solid #d9e7e7; border-right:2px solid #C9DEDC;">${emailCell(label)}</td>
                                        <td style="padding:10px 12px; border-top:1px solid #d9e7e7; text-align:left; ${valueStyle}${wrapStyle}">${emailCell(value, "Not entered")}</td>
                                      </tr>`;
}

function emailSegment(title, rows) {
  return `
                          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate; border-spacing:0; width:100%; border:1px solid #d9e7e7; border-radius:12px;">
                            <tbody>
                              <tr>
                                <td style="padding:0;">
                                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; width:100%;">
                                    <tbody>
                                      <tr>
                                        <td style="padding:12px; font-weight:700; color:#ffffff; background:#007A78; border-radius:12px 12px 0 0;">${emailCell(title)}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; width:100%; font-size:13px;">
                                    <tbody>${rows.join("")}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>`;
}

function urgencyEmailColours(urgency) {
  if (urgency === "U1_immediate_emergency") return { bg: "#FFF3F3", accent: "#B42318", text: "#ffffff", label: "#B42318" };
  if (urgency === "U2_same_day_clinical") return { bg: "#FFF8F1", accent: "#E86A10", text: "#ffffff", label: "#E86A10" };
  if (urgency === "U3_routine_clinical") return { bg: "#FFFBEA", accent: "#F2C94C", text: "#1a1a1a", label: "#6B5600" };
  if (urgency === "U4_service_or_admin") return { bg: "#F1F8F2", accent: "#2E7D32", text: "#ffffff", label: "#2E7D32" };
  return { bg: "#F1F7FF", accent: "#1565C0", text: "#ffffff", label: "#1565C0" };
}

function generateCaseCode() {
  const date = (state.callDetails.dateOfReferral || "").replace(/-/g, "");
  const mrn = isRepeatOnlyMode() ? state.repeatCallUpdate.mrn : state.patient.mrn;
  return [date, mrn].filter(Boolean).join("-");
}

function buildRepeatCallEmailHtml() {
  const urgency = currentRouteUrgency();
  const colours = urgencyEmailColours(urgency);
  const triageCategory = repeatCallTriageFormValue();

  return `<div style="margin:0; padding:0; background:#ffffff;">
  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; background:#ffffff; width:100%;">
    <tbody>
      <tr>
        <td style="padding:24px 12px;">
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:720px; border-collapse:separate; border-spacing:0; font-family:Arial, Helvetica, sans-serif; color:#1a1a1a;">
            <tbody>
              <tr>
                <td style="background:#4F5F2F; padding:0; border-radius:12px 12px 0 0;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; width:100%;">
                    <tbody>
                      <tr>
                        <td style="padding:22px 20px; text-align:center; vertical-align:middle;">
                          <div style="font-size:22px; line-height:28px; font-weight:700; color:#ffffff;">Martha's Rule Repeat Call Triage Notification</div>
                          <div style="font-size:15px; line-height:21px; font-weight:700; color:#eef3e4; margin-top:8px;">${emailCell(repeatWardAreaDisplayValue(), "Ward / area not entered")}</div>
                        </td>
                        <td style="width:120px; padding:16px 18px 16px 0; text-align:right; vertical-align:top;">
                          <div style="display:inline-block; width:86px; height:86px; border-radius:50%; background:#ffffff; color:#4F5F2F; border:4px solid #eef3e4; text-align:center; font-weight:700;">
                            <div style="font-size:13px; line-height:15px; margin-top:22px; letter-spacing:0.8px;">REPEAT</div>
                            <div style="font-size:11px; line-height:14px;">CALL</div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff; border:1px solid #d8dfca; border-top:none; padding:18px 20px;">
                  <p style="margin:0 0 12px 0; font-size:14px; line-height:20px;">Dear colleagues,</p>
                  <p style="margin:0 0 12px 0; font-size:14px; line-height:20px;">This is an automated notification to inform you that a <strong>repeat Martha's Rule call</strong> has been received for your clinical area.</p>
                  <p style="margin:0; font-size:14px; line-height:20px;">The caller has contacted the phoneline again following a previous Martha's Rule call or related concern. The repeat call has been re-triaged based on the current information provided, and the outcome is shown below.</p>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff; border:1px solid #d8dfca; border-top:none; padding:14px 20px;">
                  <div style="text-align:center; font-size:15px; line-height:20px; font-weight:700; color:#4F5F2F;">Repeat Call Triage Summary</div>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff; border:1px solid #d8dfca; border-top:none; padding:16px 20px 18px 20px; border-radius:0 0 12px 12px;">
${emailSegment("Repeat Call Alert", [
  emailRow("Date of repeat call", formatDateForEmail(state.callDetails.dateOfReferral)),
  emailRow("Time phone answered", state.callDetails.timePhoneAnswered, true),
  emailRow("MRN number", state.repeatCallUpdate.mrn, false, { strong: true }),
]).replace(/#007A78/g, "#4F5F2F").replace(/#d9e7e7/g, "#d8dfca").replace(/#C9DEDC/g, "#c7d2b4")}
                  <div style="height:14px; line-height:14px;">&nbsp;</div>
${emailSegment("Patient & Location Details", [
  emailRow("Ward / Area", repeatWardAreaDisplayValue(), true, { strong: true }),
  emailRow("Bed number", state.repeatCallUpdate.bedNumber),
])}
                  <div style="height:14px; line-height:14px;">&nbsp;</div>
${emailSegment("Current Concern Classification", [
  emailRow("Acute or non-acute concern", categoryOfCallLabel(state.triage), true, { strong: true }),
  emailRow("Primary concern", repeatPrimaryConcernFormValue()),
  emailRow("Secondary driver for escalation", repeatSecondaryConcernFormValue(), true),
  emailRow("Has the caller already contacted the ward/local team?", wardContactLabel(state.triage.wardContact), false, { strong: true }),
])}
                  <div style="height:14px; line-height:14px;">&nbsp;</div>
${emailSegment("Current Repeat Call Update", [
  emailRow("Why has the caller contacted the phoneline again?", state.repeatCallUpdate.additionalInformation, false, { vertical: true, wrap: true }),
]).replace(/#007A78/g, "#4F5F2F").replace(/#d9e7e7/g, "#d8dfca").replace(/#C9DEDC/g, "#c7d2b4")}
                  <div style="height:14px; line-height:14px;">&nbsp;</div>
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate; border-spacing:0; width:100%; border:2px solid ${colours.accent}; border-radius:14px;">
                    <tbody>
                      <tr>
                        <td style="padding:14px 16px; font-weight:700; color:${colours.text}; background:${colours.accent}; border-radius:12px 12px 0 0;">Repeat Call Triaging Output</td>
                      </tr>
                      <tr>
                        <td style="padding:24px 18px; background:${colours.bg}; text-align:center; border-top:1px solid #d9e7e7;">
                          <div style="font-size:13px; line-height:18px; color:${colours.label}; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">Assigned urgency category</div>
                          <div style="display:inline-block; margin-top:10px; padding:16px 34px; background:${colours.accent}; color:${colours.text}; font-size:34px; line-height:40px; font-weight:700; border-radius:16px; letter-spacing:1px;">${emailCell(triageCategory, categoryDisplayLabel(urgency))}</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0;">
${urgencyGuideEmailHtml()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div style="margin-top:16px; padding:14px 16px; background:#F7FAF1; border:1px solid #d8dfca; border-left:6px solid #4F5F2F; border-radius:14px;">
                    <p style="margin:0; font-size:13px; line-height:18px; color:#1a1a1a;">This is a <strong>repeat Martha's Rule call</strong>. Please review the current concern locally, ensure the patient or family receives a clear update, and identify any follow-up actions required. For <strong>U1</strong> and <strong>U2</strong> calls, PERRT will attend to review the patient and a further assessment notification will follow.</p>
                  </div>
                  <p style="margin:14px 0 0 0; font-size:13px; line-height:18px;">Best wishes,<br><span style="color:#0b3d3c;">Martha's Rule Steering Group &amp; PERRT</span></p>
                  <p style="margin:10px 0 0 0; font-size:11px; line-height:16px; color:#666666;">This email is generated automatically from a Martha's Rule repeat call record. Please do not reply to this message unless you have been advised to do so.</p>
                </td>
              </tr>
              <tr>
                <td style="height:14px; line-height:14px;">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>`;
}

function urgencyGuideEmailHtml() {
  return `
                                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; width:100%;">
                                    <tbody>
                                      <tr>
                                        <td style="padding:16px 18px; background:#ffffff; border-top:1px solid #d9e7e7;">
                                          <div style="font-size:15px; line-height:21px; font-weight:700; color:#1a1a1a; margin-bottom:10px;">Urgency Category Guide</div>
                                          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate; border-spacing:0 8px; width:100%; font-size:13px;">
                                            <tbody>
                                              <tr>
                                                <td style="width:58px; padding:10px 12px; background:#B42318; color:#ffffff; font-weight:700; text-align:center; border-radius:10px 0 0 10px;">U1</td>
                                                <td style="padding:10px 12px; background:#FFF3F3; color:#333333; border:1px solid #F1C2C2; border-left:none; border-radius:0 10px 10px 0;"><strong style="color:#8A1A12;">Emergent concern</strong><br>This will be reviewed by PERRT immediately for possible acute deterioration.</td>
                                              </tr>
                                              <tr>
                                                <td style="width:58px; padding:10px 12px; background:#E86A10; color:#ffffff; font-weight:700; text-align:center; border-radius:10px 0 0 10px;">U2</td>
                                                <td style="padding:10px 12px; background:#FFF8F1; color:#333333; border:1px solid #F0CFAE; border-left:none; border-radius:0 10px 10px 0;"><strong style="color:#B14D00;">Urgent concern</strong><br>Urgent review by PERRT. PERRT will review within one hour.</td>
                                              </tr>
                                              <tr>
                                                <td style="width:58px; padding:10px 12px; background:#F2C94C; color:#1a1a1a; font-weight:700; text-align:center; border-radius:10px 0 0 10px;">U3</td>
                                                <td style="padding:10px 12px; background:#FFFBEA; color:#333333; border:1px solid #E6D37A; border-left:none; border-radius:0 10px 10px 0;"><strong style="color:#6B5600;">Routine clinical concern</strong><br>Local ward or clinical area to be notified. The concern appears suitable for ward management.</td>
                                              </tr>
                                              <tr>
                                                <td style="width:58px; padding:10px 12px; background:#2E7D32; color:#ffffff; font-weight:700; text-align:center; border-radius:10px 0 0 10px;">U4</td>
                                                <td style="padding:10px 12px; background:#F1F8F2; color:#333333; border:1px solid #BFD9C2; border-left:none; border-radius:0 10px 10px 0;"><strong style="color:#1B5E20;">Service-related concern</strong><br>Non-clinical concern for local follow-up.</td>
                                              </tr>
                                              <tr>
                                                <td style="width:58px; padding:10px 12px; background:#1565C0; color:#ffffff; font-weight:700; text-align:center; border-radius:10px 0 0 10px;">U5</td>
                                                <td style="padding:10px 12px; background:#F1F7FF; color:#333333; border:1px solid #BCD6F2; border-left:none; border-radius:0 10px 10px 0;"><strong style="color:#0D47A1;">Other or incomplete concern</strong><br>Non-clinical concern without enough information, possibly due to an interrupted call. Local team to be made aware.</td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>`;
}

function buildVisitLogEmailHtml() {
  const visit = state.visitLog;
  return `<div style="margin:0; padding:0; background:#ffffff;">
  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; background:#ffffff; width:100%;">
    <tbody>
      <tr>
        <td style="padding:24px 12px;">
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:860px; border-collapse:separate; border-spacing:0; font-family:Arial, Helvetica, sans-serif; color:#1a1a1a;">
            <tbody>
              <tr>
                <td style="background:#007A78; padding:22px 20px; border-radius:12px 12px 0 0; text-align:center;">
                  <div style="font-size:22px; line-height:28px; font-weight:700; color:#ffffff;">Martha's Rule Call: PERRT Review</div>
	                  <div style="font-size:15px; line-height:21px; font-weight:700; color:#e7f6f6; margin-top:8px;">Ward: ${emailCell(visitLogWardAreaDisplayValue(), "Ward / area not entered")}</div>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff; border:1px solid #d9e7e7; border-top:none; padding:18px 20px;">
                  <p style="margin:0 0 12px 0; font-size:14px; line-height:20px;">Dear colleagues,</p>
                  <p style="margin:0 0 12px 0; font-size:14px; line-height:20px;">This email is to inform you that, following an earlier Martha's Rule call for MRN <strong>${emailCell(state.patient.mrn, "Not entered")}</strong>, the call was triaged and the patient was subsequently visited and reviewed by PERRT.</p>
                  <p style="margin:0; font-size:14px; line-height:20px;">The summary of the PERRT visit, including the clinical assessment, actions, outcomes and any learning identified, is provided below.</p>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff; border:1px solid #d9e7e7; border-top:none; padding:14px 20px;">
                  <div style="text-align:center; font-size:15px; line-height:20px; font-weight:700; color:#005E5C;">PERRT Review Summary</div>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff; border:1px solid #d9e7e7; border-top:none; padding:16px 20px 18px 20px; border-radius:0 0 12px 12px;">
${emailSegment("Attendance and Clinical Assessment", [
  emailRow("6-digit code", visit.clinicalAssessment.caseCode),
  emailRow("MRN number", state.patient.mrn, true, { strong: true }),
  emailRow("Ward", visitLogWardAreaDisplayValue()),
  emailRow("Date of visit", formatDateForEmail(visit.dateOfVisit), true),
  emailRow("Time of PERRT/Outreach attendance", visit.timeOfAttendance),
  emailRow("NEWS2 at time of call", visit.clinicalAssessment.news2AtCall, true),
  emailRow("NEWS2 at time of attendance", visit.clinicalAssessment.news2AtAttendance),
  emailRow("Additional clinical notes", visit.clinicalAssessment.additionalClinicalNotes, true, { vertical: true, wrap: true }),
])}
                  <div style="height:14px; line-height:14px;">&nbsp;</div>
${emailSegment("Actions and Outcomes", [
  emailRow("PERRT actions taken", listLabels(perrtActionOptions, visit.actionsOutcomes.perrtActionsTaken), true, { vertical: true, wrap: true }),
  emailRow("Total time spent managing concern [hours]", visit.actionsOutcomes.totalTimeSpent),
  emailRow("Outcome of call", listLabels(outcomeOptions, visit.actionsOutcomes.outcomes), true, { vertical: true, wrap: true }),
])}
                  <div style="height:14px; line-height:14px;">&nbsp;</div>
${emailSegment("Learning and Notifications", [
  emailRow("Learning identified?", learningStatusLabel(), true),
  emailRow("Learning theme", visit.actionsOutcomes.learningTheme),
  emailRow("Feedback / learning notes", visit.actionsOutcomes.feedbackLearningNotes, true, { vertical: true, wrap: true }),
  emailRow("Default notification recipients", "Managers; Matrons"),
  emailRow("Submitted by", "Generated from visit log app", true),
])}
                  <p style="margin:14px 0 0 0; font-size:13px; line-height:18px;">Best wishes,<br><span style="color:#0b3d3c;">Martha's Rule Steering Group &amp; PERRT</span></p>
                  <p style="margin:10px 0 0 0; font-size:11px; line-height:16px; color:#666666;">This email is generated automatically from a Martha's Rule PERRT review record following a triaged Martha's Rule call.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>`;
}

function generateHtmlEmail() {
  if (activeTab === "visitLog") {
    state.generatedEmailHtml = buildVisitLogEmailHtml();
    emailPreviewOpen = true;
    return;
  }

  if (isRepeatOnlyMode()) {
    state.generatedEmailHtml = buildRepeatCallEmailHtml();
    emailPreviewOpen = true;
    return;
  }

  const urgency = calculateUrgency();
  const colours = urgencyEmailColours(urgency);
  const category = state.triage;
  const isRepeat = isRepeatOnlyMode();
  const ward = isRepeat ? repeatWardAreaDisplayValue() : locationWardAreaDisplayValue();
  const bed = isRepeat ? state.repeatCallUpdate.bedNumber : state.location.bedNumber;
  const mrn = isRepeat ? state.repeatCallUpdate.mrn : state.patient.mrn;
  const dob = isRepeat ? "" : formatDateForEmail(state.patient.dob);
  const mainReason = isRepeat ? state.repeatCallUpdate.additionalInformation : primaryConcernFormValueForCategory(category);
  const additionalInformation = isRepeat ? state.repeatCallUpdate.additionalInformation : state.concernSummary.concernsSummary;
  const secondaryConcern = isRepeat ? "" : secondaryConcernFormValueForCategory(category);
  const wardContact = isRepeat ? "" : wardContactLabel(category.wardContact);
  const formLink = buildMicrosoftFormUrl();
  const triageCategory = isRepeat ? repeatCallTriageFormValue() : microsoftFormTriageCategoryLabel(urgency);

  state.generatedEmailHtml = `<div style="margin:0; padding:0; background:#ffffff;">
  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; background:#ffffff; width:100%;">
    <tbody>
      <tr>
        <td style="padding:24px 12px;">
          <table cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:860px; border-collapse:separate; border-spacing:0; font-family:Arial, Helvetica, sans-serif; color:#1a1a1a;">
            <tbody>
              <tr>
                <td style="background:#007A78; padding:22px 20px; border-radius:12px 12px 0 0; text-align:center;">
                  <div style="font-size:22px; line-height:28px; font-weight:700; color:#ffffff;">Martha's Rule Call Triage Notification</div>
                  <div style="font-size:15px; line-height:21px; font-weight:700; color:#e7f6f6; margin-top:8px;">${emailCell(ward, "Ward / area not entered")}</div>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff; border:1px solid #d9e7e7; border-top:none; padding:18px 20px;">
                  <p style="margin:0 0 12px 0; font-size:14px; line-height:20px;">Dear colleagues,</p>
                  <p style="margin:0; font-size:14px; line-height:20px;">This is an automated notification to inform you that a <strong>Martha's Rule call</strong> has been placed in your clinical area and that we have spoken to the patient. Based on the information provided by the patient, we have triaged the call, and the outcome is shown below.</p>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff; border:1px solid #d9e7e7; border-top:none; padding:14px 20px;">
                  <div style="text-align:center; font-size:15px; line-height:20px; font-weight:700; color:#005E5C;">Martha's Rule Call Triage Summary</div>
                </td>
              </tr>
              <tr>
                <td style="background:#ffffff; border:1px solid #d9e7e7; border-top:none; padding:16px 20px 18px 20px; border-radius:0 0 12px 12px;">
                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; width:100%;">
                    <tbody>
                      <tr>
                        <td style="vertical-align:top; width:57%; padding-right:14px;">
${emailSegment("Form & Call Details", [
  emailRow("Form submitter name", "Generated from triage app"),
  emailRow("Date of call", formatDateForEmail(state.callDetails.dateOfReferral), true),
  emailRow("Time phone answered", state.callDetails.timePhoneAnswered),
  emailRow("Case code", generateCaseCode(), true, { strong: true }),
])}
                          <div style="height:14px; line-height:14px;">&nbsp;</div>
${emailSegment("Patient & Location Details", [
  emailRow("MRN number", mrn, true),
  emailRow("Date of birth", dob),
  emailRow("Ward / Area", ward, true, { strong: true }),
  emailRow("Bed number", bed),
])}
                          <div style="height:14px; line-height:14px;">&nbsp;</div>
${emailSegment("Caller Concern", [
  emailRow("Who made the call?", callerTypeFormLabel()),
  emailRow("Main reason for call", mainReason, true, { strong: true, wrap: true }),
  emailRow("Additional information", additionalInformation, false, { vertical: true, wrap: true }),
  emailRow("Why did the caller use the phoneline?", secondaryConcern, true),
  emailRow("Has the caller spoken to the ward?", wardContact, false, { strong: true }),
])}
                        </td>
                        <td style="vertical-align:top; width:43%; padding-left:0;">
                          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate; border-spacing:0; width:100%; border:1px solid #d9e7e7; border-radius:12px;">
                            <tbody>
                              <tr>
                                <td style="padding:0;">
                                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; width:100%;">
                                    <tbody>
                                      <tr>
                                        <td style="padding:12px; font-weight:700; color:#ffffff; background:#007A78; border-radius:12px 12px 0 0;">Triaging Output</td>
                                      </tr>
                                      <tr>
                                        <td style="padding:18px; background:${colours.bg}; text-align:center; border-top:1px solid #d9e7e7; border-left:2px solid ${colours.accent}; border-right:2px solid ${colours.accent};">
                                          <div style="font-size:12px; line-height:18px; color:${colours.label}; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">Assigned urgency category</div>
                                          <div style="display:inline-block; margin-top:10px; padding:18px 38px; background:${colours.accent}; color:${colours.text}; font-size:38px; line-height:44px; font-weight:700; border-radius:18px; letter-spacing:1px;">${emailCell(triageCategory, categoryDisplayLabel(urgency))}</div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; width:100%; font-size:13px;">
                                    <tbody>
${emailRow("Is this call about acute deterioration?", categoryOfCallLabel(category), false, { strong: true })}
${emailRow("Does this need to be seen by PERRT?", sameDayReviewFormLabel(category), true, { strong: true })}
                                    </tbody>
                                  </table>
${urgencyGuideEmailHtml()}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div style="margin-top:16px; padding:14px 16px; background:#F7FBFB; border:1px solid #BFDCDC; border-left:6px solid #007A78; border-radius:14px;">
                    <p style="margin:0; font-size:13px; line-height:18px; color:#1a1a1a;">For <strong>U1</strong> and <strong>U2</strong> calls, PERRT will attend to review the patient. Once this has happened, you will receive another email with the details of the assessment. For <strong>U3, U4 and U5</strong> calls, the concern should be reviewed and followed up by the local team as appropriate.</p>
                  </div>
                  <div style="margin-top:16px; padding:16px 18px; background:#F3FBFB; border:1px solid #BFDCDC; border-left:6px solid #007A78; border-radius:14px;">
                    <p style="margin:0 0 10px 0; font-size:14px; font-weight:700; color:#003F3D;">Debrief / review form</p>
                    <p style="margin:0 0 14px 0; font-size:13px; line-height:18px; color:#1a1a1a;">To help us collectively learn from this call, please click the link below to access the debrief / review form.</p>
                    <a href="${escapeHtml(formLink)}" style="display:inline-block; padding:14px 22px; background:#005E5C; color:#FFFFFF; font-size:14px; font-weight:700; text-decoration:none; border-radius:12px; box-shadow:0 3px 0 #004746;">Access debrief / review form</a>
                  </div>
                  <p style="margin:14px 0 0 0; font-size:13px; line-height:18px;">Best wishes,<br><span style="color:#0b3d3c;">Martha's Rule Steering Group &amp; PERRT</span></p>
                  <p style="margin:10px 0 0 0; font-size:11px; line-height:16px; color:#666666;">This email is generated automatically from a Martha's Rule triage record.</p>
                </td>
              </tr>
              <tr>
                <td style="height:14px; line-height:14px;">&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>`;
  emailPreviewOpen = true;
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function buildCsvRows() {
  if (isRepeatOnlyMode()) {
    return [
      ["Section", "Field", "Value"],
      ["Call details", "Date of referral", state.callDetails.dateOfReferral],
      ["Call details", "Time phone answered", state.callDetails.timePhoneAnswered],
      ["Call details", "Delay in answering", state.callDetails.delayInAnswering],
      ["Call details", "Repeat call", "yes"],
      ["Caller", "Who made the call", callerTypeFormLabel()],
      ["Repeat call update", "MRN", state.repeatCallUpdate.mrn],
      ["Repeat call update", "Ward / Area", repeatWardAreaDisplayValue()],
      ["Repeat call update", "Bed number", state.repeatCallUpdate.bedNumber],
      ["Repeat call update", "Reason for repeat contact", state.repeatCallUpdate.additionalInformation],
      ["Repeat call update", "Triage method", "guided"],
      ["Repeat call update", "Triage code", repeatCallTriageFormValue()],
    ];
  }

  const urgency = activeFormUrgency();
  const route = calculateRoute(urgency);
  const action = triageActionDetail(urgency);
  const category = activeFormCategory();

  return [
    ["Section", "Field", "Value"],
    ["Call details", "Date of referral", state.callDetails.dateOfReferral],
    ["Call details", "Time phone answered", state.callDetails.timePhoneAnswered],
    ["Call details", "Delay in answering", state.callDetails.delayInAnswering],
    ["Call details", "Repeat call", state.callDetails.repeatCall],
    ["Visit log", "Date of visit", state.visitLog.dateOfVisit],
    ["Visit log", "Time of PERRT/Outreach attendance", state.visitLog.timeOfAttendance],
    ["Visit handover", "Opened from triage link", state.visitLog.handover.active ? "yes" : "no"],
    ["Visit handover", "Original triage category", state.visitLog.handover.triageCategory],
    ["Visit handover", "Original primary concern", state.visitLog.handover.primaryConcern],
    ["Visit handover", "Original secondary concern", state.visitLog.handover.secondaryConcern],
    ["Visit handover", "Caller concern summary", state.visitLog.handover.callerConcernSummary],
    ["Patient", "MRN number", state.patient.mrn],
    ["Patient", "Date of birth", state.patient.dob],
    ["Patient", "Gender", state.patient.gender],
    ["Patient", "Ethnic group", state.patient.ethnicGroup],
    ["Patient", "Learning Disability or Neurodiversity", state.patient.learningDisabilityNeurodiversity],
    ["Location", "Ward / Area", exportedWardArea],
    ["Location", "Bed number", exportedBedNumber],
    ["Location", "Specialty / Medical team", state.location.specialtyMedicalTeam],
    ["Caller", "Caller type", state.caller.callerType],
    ["Visit log", "Re-categorised in visit log", state.visitLog.recategoriseCall],
    ["Triage", "Urgency", categoryDisplayLabel(urgency)],
    ["Triage", "Suggested route", route],
    ["Triage", "Recommended action", action.instruction],
    ["Triage", "Acute deterioration", category.acuteDeterioration],
    ["Triage", "Red flags", listLabels(redFlagOptions, category.redFlags)],
    ["Triage", "Core concern", primaryConcernFormValueForCategory(category)],
    ["Triage", "Same-day clinical review", category.sameDayReview],
    ["Triage", "Secondary concerns", secondaryConcernFormValueForCategory(category)],
    ["Triage", "Genuine worry follow-up", genuineWorrySummaryLabel(category)],
    ["Triage", "Ward contacted", wardContactLabel(category.wardContact)],
    ["Concern summary", "Concerns raised by caller", state.concernSummary.concernsSummary],
    ["Clinical assessment", "6-digit code", state.visitLog.clinicalAssessment.caseCode],
    ["Clinical assessment", "NEWS2 at time of call", state.visitLog.clinicalAssessment.news2AtCall],
    ["Clinical assessment", "NEWS2 at time of attendance", state.visitLog.clinicalAssessment.news2AtAttendance],
    ["Clinical assessment", "Additional clinical notes", state.visitLog.clinicalAssessment.additionalClinicalNotes],
    ["Actions and outcomes", "PERRT actions taken", listLabels(perrtActionOptions, state.visitLog.actionsOutcomes.perrtActionsTaken)],
    ["Actions and outcomes", "Total time spent managing concern [hours]", state.visitLog.actionsOutcomes.totalTimeSpent],
    ["Actions and outcomes", "Outcomes", listLabels(outcomeOptions, state.visitLog.actionsOutcomes.outcomes)],
    ["Learning", "Learning identified", state.visitLog.actionsOutcomes.learningIdentified],
    ["Learning", "Learning theme", state.visitLog.actionsOutcomes.learningTheme],
    ["Learning", "Feedback / learning notes", state.visitLog.actionsOutcomes.feedbackLearningNotes],
    ["Notifications", "Additional recipients", state.visitLog.notifications.otherEmails],
    ["Notifications", "Other emails", state.visitLog.notifications.otherEmails],
  ];
}

function makeExcelFilename() {
  const date = state.callDetails.dateOfReferral || new Date().toISOString().slice(0, 10);
  const mrn = state.patient.mrn;
  const safeMrn = mrn ? `-${mrn.replace(/[^a-zA-Z0-9_-]/g, "")}` : "";
  return `marthas-rule-call${safeMrn}-${date}.xls`;
}

function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function htmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildExcelHtml() {
  const rows = buildCsvRows();
  const bodyRows = rows.map((row, index) => `
    <tr>
      ${row.map((cell) => index === 0
        ? `<th>${htmlEscape(cell)}</th>`
        : `<td>${htmlEscape(cell)}</td>`).join("")}
    </tr>
  `).join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: Arial, sans-serif; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; vertical-align: top; }
    th { background: #e2e8f0; font-weight: 700; }
    tr:nth-child(even) td { background: #f8fafc; }
  </style>
</head>
<body>
  <table>
    ${bodyRows}
  </table>
</body>
</html>`;
}

function openJermynEmailDraft(filename) {
  const subject = encodeURIComponent("Martha's Rule Call Triage and Log");
  const body = encodeURIComponent(`Hi Jermyn,\n\nPlease find attached the generated Excel file: ${filename}\n\nBest regards,`);
  const mailto = `mailto:jermyn.congzon@nhs.net?subject=${subject}&body=${body}`;
  const link = document.createElement("a");
  link.href = mailto;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function generateExcelAndPrepareEmail() {
  const filename = makeExcelFilename();
  const excelHtml = buildExcelHtml();
  const blob = new Blob([excelHtml], { type: "application/vnd.ms-excel;charset=utf-8" });
  downloadFile(blob, filename);
  openJermynEmailDraft(filename);
  window.alert("The Excel file has been generated and the email draft to jermyn.congzon@nhs.net has been opened. Please attach the downloaded file to the email before sending.");
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;
  try {
    const parsed = JSON.parse(saved);
    state = { ...clone(defaultState), ...parsed };
    state.currentVisitStep = Number.isInteger(parsed.currentVisitStep) ? parsed.currentVisitStep : 0;
    if (!state.triage) state.triage = clone(defaultState.triage);
    state.visitLog = {
      ...clone(defaultState.visitLog),
      ...(parsed.visitLog || {}),
      callCategory: {
        ...clone(defaultState.visitLog.callCategory),
        ...(parsed.visitLog?.callCategory || {}),
      },
      location: {
        ...clone(defaultState.visitLog.location),
        ...(parsed.visitLog?.location || {}),
      },
      clinicalAssessment: {
        ...clone(defaultState.visitLog.clinicalAssessment),
        ...(parsed.visitLog?.clinicalAssessment || parsed.clinicalAssessment || {}),
      },
      actionsOutcomes: {
        ...clone(defaultState.visitLog.actionsOutcomes),
        ...(parsed.visitLog?.actionsOutcomes || parsed.actionsOutcomes || {}),
      },
      notifications: {
        ...clone(defaultState.visitLog.notifications),
        ...(parsed.visitLog?.notifications || parsed.notifications || {}),
      },
      handover: {
        ...clone(defaultState.visitLog.handover),
        ...(parsed.visitLog?.handover || {}),
      },
    };
    state.location = {
      ...clone(defaultState.location),
      ...(parsed.location || {}),
    };
    state.visitLog.dateOfVisit = parsed.visitLog?.dateOfVisit || state.visitLog.dateOfVisit || "";
    state.visitLog.timeOfAttendance = parsed.visitLog?.timeOfAttendance || parsed.callDetails?.timeOfAttendance || state.visitLog.timeOfAttendance || "";
    delete state.triage.secondaryType;
    delete state.triage.secondaryDetails;
    delete state.triage.sameDayIndicators;
    delete state.callDetails.timeOfAttendance;
    delete state.clinicalAssessment;
    delete state.actionsOutcomes;
    delete state.notifications;
    state.repeatCallUpdate = {
      ...clone(defaultState.repeatCallUpdate),
      ...(parsed.repeatCallUpdate || {}),
    };
    state.triage.secondaryFactors = state.triage.secondaryFactors || [];
    state.triage.wardContact = state.triage.wardContact || "";
    state.visitLog.actionsOutcomes.perrtActionsTaken = state.visitLog.actionsOutcomes.perrtActionsTaken || [];
    state.visitLog.actionsOutcomes.outcomes = state.visitLog.actionsOutcomes.outcomes || [];
    state.visitLog.notifications.recipients = state.visitLog.notifications.recipients || [];
    state.visitLog.callCategory.redFlags = state.visitLog.callCategory.redFlags || [];
    state.visitLog.callCategory.secondaryFactors = state.visitLog.callCategory.secondaryFactors || [];
    state.triage.genuineWorry = state.triage.genuineWorry || "";
    state.visitLog.callCategory.genuineWorry = state.visitLog.callCategory.genuineWorry || "";
    normalizeSavedTaxonomy();
    normalizeWardAreaValues();
  } catch (error) {
    state = clone(defaultState);
  }
}

function getCaseCodeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return normalizeCaseCode(params.get(VISIT_LOG_CASE_CODE_QUERY_PARAM));
}

function firstUrlParam(params, names) {
  for (const name of names) {
    const value = params.get(name);
    if (value) return value.trim();
  }
  return "";
}

function getVisitLogPrefillFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return {
    mrn: firstUrlParam(params, VISIT_LOG_PREFILL_QUERY_PARAMS.mrn),
    wardArea: firstUrlParam(params, VISIT_LOG_PREFILL_QUERY_PARAMS.wardArea),
    wardAreaOther: firstUrlParam(params, VISIT_LOG_PREFILL_QUERY_PARAMS.wardAreaOther),
    bedNumber: firstUrlParam(params, VISIT_LOG_PREFILL_QUERY_PARAMS.bedNumber),
    triageCategory: firstUrlParam(params, VISIT_LOG_PREFILL_QUERY_PARAMS.triageCategory),
    primaryConcern: firstUrlParam(params, VISIT_LOG_PREFILL_QUERY_PARAMS.primaryConcern),
    secondaryConcern: firstUrlParam(params, VISIT_LOG_PREFILL_QUERY_PARAMS.secondaryConcern),
    callerConcernSummary: firstUrlParam(params, VISIT_LOG_PREFILL_QUERY_PARAMS.callerConcernSummary),
  };
}

function applyUrlPrefill() {
  const caseCode = getCaseCodeFromUrl();
  if (!caseCode) return;
  const prefill = getVisitLogPrefillFromUrl();

  state.visitLog = state.visitLog || clone(defaultState.visitLog);
  state.visitLog.clinicalAssessment = {
    ...clone(defaultState.visitLog.clinicalAssessment),
    ...(state.visitLog.clinicalAssessment || {}),
  };
  state.visitLog.handover = {
    ...clone(defaultState.visitLog.handover),
    ...(state.visitLog.handover || {}),
  };
  state.visitLog.location = {
    ...clone(defaultState.visitLog.location),
    ...(state.visitLog.location || {}),
  };

  state.visitLog.clinicalAssessment.caseCode = caseCode;
  if (prefill.wardArea) {
    if (wardAreaSuggestions.includes(prefill.wardArea)) {
      state.visitLog.location.wardArea = prefill.wardArea;
      state.visitLog.location.wardAreaOther = prefill.wardArea === "Other" ? prefill.wardAreaOther : "";
    } else {
      state.visitLog.location.wardArea = "Other";
      state.visitLog.location.wardAreaOther = prefill.wardAreaOther || prefill.wardArea;
    }
  }
  if (prefill.bedNumber) {
    state.visitLog.location.bedNumber = prefill.bedNumber;
  }
  state.visitLog.handover = {
    active: true,
    triageCategory: prefill.triageCategory,
    primaryConcern: prefill.primaryConcern,
    secondaryConcern: prefill.secondaryConcern,
    callerConcernSummary: prefill.callerConcernSummary,
  };
  if (prefill.mrn) {
    state.patient.mrn = prefill.mrn;
  }

  activeTab = "visitLog";
  appModeSelected = true;
  state.currentVisitStep = 0;
}

function resetState() {
  state = clone(defaultState);
  emailPreviewOpen = false;
  epicSummaryCollapsed = true;
  wardContactModalOpen = false;
  otherWardEmailModalOpen = false;
  otherWardEmailOpenFormAfterSave = false;
  localStorage.removeItem(STORAGE_KEY);
}

function applyTestAutofill() {
  const testState = clone(defaultState);

  testState.callDetails = {
    dateOfReferral: "2026-05-19",
    timePhoneAnswered: "09:30",
    delayInAnswering: "no",
    repeatCall: "no",
  };
  testState.caller.callerType = "family_carer";
  testState.patient = {
    mrn: "999999",
    dob: "1970-01-01",
    gender: "Not Stated",
    ethnicGroup: "Not stated",
    learningDisabilityNeurodiversity: "not_known",
  };
  testState.location = {
    wardArea: "Test",
    wardAreaOther: "",
    otherWardRecipientEmails: "",
    bedNumber: "B12",
    specialtyMedicalTeam: "General Medicine",
  };
  testState.triage = {
    acuteDeterioration: "no",
    redFlags: [],
    otherRedFlagText: "",
    coreConcern: "pain",
    sameDayReview: "yes",
    secondaryFactors: ["raised_but_unresolved", "delay_in_response_or_action"],
    genuineWorry: "",
    wardContact: "yes",
    noticeRecipients: ["uclh.PERRTband8@nhs.net", "jermyn.congzon@nhs.net"],
  };
  testState.concernSummary = {
    mostWorried: "Family reports the patient has ongoing pain and feels more unwell.",
    alreadyTried: "Caller has spoken to the ward team and is waiting for a further update.",
    unresolved: "Pain and communication concerns remain unresolved.",
    concernsSummary: "Test record: family is worried about ongoing pain, delay in response, and unresolved ward communication.",
  };
  testState.repeatCallUpdate = {
    mrn: "999999",
    wardArea: "Test",
    wardAreaOther: "",
    otherWardRecipientEmails: "",
    bedNumber: "B12",
    sameConcern: "",
    additionalInformation: "Test repeat-call note: caller contacted the phoneline again because the concern remains unresolved.",
    triageMethod: "guided",
    directTriageCode: "",
  };
  testState.visitLog = {
    ...testState.visitLog,
    recategoriseCall: "no",
    location: {
      wardArea: "Test",
      wardAreaOther: "",
      bedNumber: "B12",
    },
    dateOfVisit: "2026-05-19",
    timeOfAttendance: "10:15",
    clinicalAssessment: {
      caseCode: "ABC123",
      news2AtCall: "2",
      news2AtAttendance: "2",
      additionalClinicalNotes: "Test visit log: patient reviewed, observations stable, advice given to ward team.",
    },
    actionsOutcomes: {
      perrtActionsTaken: ["clinical_review_suggestions", "safety_netting"],
      totalTimeSpent: "1",
      outcomes: ["Discharged from PERRT/Outreach list"],
      learningIdentified: "yes",
      learningTheme: "Communication",
      feedbackLearningNotes: "Test learning note: confirm clear ward update and document follow-up plan.",
    },
    notifications: {
      recipients: [],
      otherEmails: "",
    },
    handover: {
      active: true,
      triageCategory: "U2 - Urgent clinical",
      primaryConcern: "Pain",
      secondaryConcern: "Raised but unresolved; delay in response or action",
      callerConcernSummary: "Test handover: family worried about ongoing pain and delayed response.",
    },
  };

  state = testState;
  activeTab = "triage";
  appModeSelected = true;
  state.currentStep = triageSteps.length - 1;
  state.currentVisitStep = 0;
  summaryCollapsed = false;
  epicSummaryCollapsed = true;
  emailPreviewOpen = false;
  wardContactModalOpen = false;
  otherWardEmailModalOpen = false;
  otherWardEmailOpenFormAfterSave = false;
  noticeRecipientModalOpen = false;
  urgencyGuideOpen = false;
  selectedUrgencyGuide = "";
  selectedConcernHelp = "";
  generateStructuredSummary();
  saveState();
}

function normalizeWardContactDirectory(directory) {
  const normalized = Object.fromEntries(wardAreaSuggestions.map((wardArea) => [wardArea, []]));
  Object.entries(directory || {}).forEach(([wardArea, contacts]) => {
    normalized[wardArea] = Array.isArray(contacts) ? contacts : [];
  });
  return normalized;
}

async function loadWardContactDirectory() {
  try {
    const response = await fetch("assets/ward-contacts.json", { cache: "no-store" });
    if (!response.ok) return;
    wardContactDirectory = normalizeWardContactDirectory(await response.json());
  } catch (error) {
    wardContactDirectory = normalizeWardContactDirectory(wardContactDirectory);
  }
}

function resetSecondaryTriage() {
  state.triage.secondaryFactors = [];
  state.triage.genuineWorry = "";
  state.triage.wardContact = "";
}

function resetSecondaryCategory(pathPrefix) {
  setPath(`${pathPrefix}.secondaryFactors`, []);
  setPath(`${pathPrefix}.genuineWorry`, "");
  setPath(`${pathPrefix}.wardContact`, "");
}

function resetTriageCategory() {
  state.triage = clone(defaultState.triage);
}

function applyChangeSideEffects(path, value) {
  if (path === "callDetails.repeatCall") {
    state.currentStep = value === "yes" ? 1 : 0;
    if (value === "yes") {
      state.repeatCallUpdate.triageMethod = "guided";
      state.repeatCallUpdate.directTriageCode = "";
    }
  }

  if (path === "location.wardArea" && value !== "Other") {
    state.location.wardAreaOther = "";
  }

  if (path === "repeatCallUpdate.wardArea" && value !== "Other") {
    state.repeatCallUpdate.wardAreaOther = "";
    state.repeatCallUpdate.otherWardRecipientEmails = "";
  }
  if (path === "visitLog.location.wardArea" && value !== "Other") {
    state.visitLog.location.wardAreaOther = "";
    state.visitLog.notifications.otherEmails = "";
  }

  if (path === "repeatCallUpdate.triageMethod") {
    if (value === "direct") resetTriageCategory();
    if (value === "guided") state.repeatCallUpdate.directTriageCode = "";
  }

  if (path === "triage.acuteDeterioration") {
    state.triage.redFlags = [];
    state.triage.coreConcern = "";
    state.triage.sameDayReview = "";
    resetSecondaryTriage();
  }

  if (path === "triage.coreConcern") {
    state.triage.sameDayReview = "";
    resetSecondaryTriage();
  }

  if (path === "triage.redFlags") {
    state.triage.coreConcern = "";
    state.triage.sameDayReview = "";
    resetSecondaryTriage();
  }

  if (path === "triage.sameDayReview") {
    resetSecondaryTriage();
  }

  if (path === "triage.secondaryFactors") {
    state.triage.wardContact = "";
    state.triage.genuineWorry = "";
  }

  if (path === "visitLog.actionsOutcomes.learningIdentified" && value === "no") {
    state.visitLog.actionsOutcomes.learningTheme = "";
    state.visitLog.actionsOutcomes.feedbackLearningNotes = "";
  }

  if (path === "visitLog.recategoriseCall" && value !== "yes") {
    state.visitLog.callCategory = clone(defaultState.visitLog.callCategory);
  }

  if (path === "visitLog.callCategory.acuteDeterioration") {
    state.visitLog.callCategory.redFlags = [];
    state.visitLog.callCategory.coreConcern = "";
    state.visitLog.callCategory.sameDayReview = "";
    resetSecondaryCategory("visitLog.callCategory");
  }

  if (path === "visitLog.callCategory.coreConcern") {
    state.visitLog.callCategory.sameDayReview = "";
    resetSecondaryCategory("visitLog.callCategory");
  }

  if (path === "visitLog.callCategory.redFlags") {
    state.visitLog.callCategory.coreConcern = "";
    state.visitLog.callCategory.sameDayReview = "";
    resetSecondaryCategory("visitLog.callCategory");
  }

  if (path === "visitLog.callCategory.sameDayReview") {
    resetSecondaryCategory("visitLog.callCategory");
  }

  if (path === "visitLog.callCategory.secondaryFactors") {
    state.visitLog.callCategory.wardContact = "";
    state.visitLog.callCategory.genuineWorry = "";
  }

  if (path === "triage.genuineWorry") {
    state.triage.secondaryFactors = [];
    state.triage.wardContact = "";
  }

  if (path === "visitLog.callCategory.genuineWorry") {
    state.visitLog.callCategory.secondaryFactors = [];
    state.visitLog.callCategory.wardContact = "";
  }

  if (path === "visitLog.clinicalAssessment.caseCode") {
    state.visitLog.clinicalAssessment.caseCode = normalizeCaseCode(value);
  }
}

app.addEventListener("input", (event) => {
  const target = event.target.closest("[data-bind]");
  if (!target || target.type === "radio" || target.type === "checkbox") return;
  const path = target.dataset.bind;
  const value = path === "visitLog.clinicalAssessment.caseCode" ? normalizeCaseCode(target.value) : target.value;
  if (value !== target.value) target.value = value;
  setPath(path, value);
  if (target.tagName === "TEXTAREA") {
    const counter = target.closest(".textarea-wrap")?.querySelector(".char-counter");
    if (counter) counter.textContent = `${target.value.length}/${target.maxLength}`;
  }
});

app.addEventListener("change", (event) => {
  const target = event.target.closest("[data-bind]");
  if (!target) return;

  const path = target.dataset.bind;
  const isChoiceOrSelect = target.type === "checkbox" || target.type === "radio" || target.tagName === "SELECT";
  if (!isChoiceOrSelect) return;

  if (target.type === "checkbox") {
    const current = getPath(path) || [];
    let next = target.checked ? [...current, target.value] : current.filter((item) => item !== target.value);
    if (target.dataset.exclusiveNone === "true") {
      if (target.value === "none" && target.checked) next = ["none"];
      if (target.value !== "none") next = next.filter((item) => item !== "none");
    }
    setPath(path, next);
  } else if (target.dataset.arraySingle === "true") {
    setPath(path, target.value ? [target.value] : []);
  } else {
    setPath(path, target.value);
  }

  applyChangeSideEffects(path, target.value);
  if (path.startsWith("triage.")) {
    queueTriageQuestionCenter();
  }

  suppressNextRenderAnimations = true;
  renderApp();
});

app.addEventListener("pointerdown", (event) => {
  const handoverDragHandle = event.target.closest("[data-action='drag-handover-window'], [data-drag-handle='handover-window']");
  if (handoverDragHandle) {
    beginHandoverWindowDrag(event, handoverDragHandle);
    return;
  }

  const choice = event.target.closest(".choice");
  const radio = choice ? choice.querySelector("input[type='radio']") : null;
  if (radio) radio.dataset.wasChecked = radio.checked ? "true" : "false";
});

window.addEventListener("pointermove", updateHandoverWindowDrag);
window.addEventListener("pointerup", endHandoverWindowDrag);
window.addEventListener("pointercancel", endHandoverWindowDrag);

app.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-backdrop")) {
    urgencyGuideOpen = false;
    selectedUrgencyGuide = "";
    selectedConcernHelp = "";
    emailPreviewOpen = false;
    wardContactModalOpen = false;
    otherWardEmailModalOpen = false;
    otherWardEmailOpenFormAfterSave = false;
    noticeRecipientModalOpen = false;
    renderApp();
    return;
  }

  const concernHelpTarget = event.target.closest("[data-action='show-concern-help']");
  if (concernHelpTarget) {
    event.preventDefault();
    event.stopPropagation();
    selectedConcernHelp = concernHelpTarget.dataset.concern || "";
    renderApp();
    return;
  }

  const choice = event.target.closest(".choice");
  const selectedRadio = choice ? choice.querySelector("input[type='radio']:checked") : null;
  if (selectedRadio && selectedRadio.dataset.wasChecked === "true") {
    event.preventDefault();
    const path = selectedRadio.dataset.bind;
    setPath(path, "");
    applyChangeSideEffects(path, "");
    renderApp();
    return;
  }

  const target = event.target.closest("[data-action]");
  if (!target) return;

  const action = target.dataset.action;
  if (action !== "toggle-version-menu" && action !== "auto-fill-test") {
    autoFillMenuOpen = false;
  }
  if (action === "auto-fill-test") {
    autoFillMenuOpen = false;
    applyTestAutofill();
  }
  if (action === "toggle-version-menu") {
    autoFillMenuOpen = !autoFillMenuOpen;
  }
  if (action === "toggle-theme") {
    toggleThemePreference();
  }
  if (action === "start-mode") {
    activeTab = target.dataset.tab || "triage";
    appModeSelected = true;
  }
  if (action === "open-process-poster") {
    processPosterOpen = true;
  }
  if (action === "close-process-poster") {
    processPosterOpen = false;
  }
  if (action === "toggle-handover-window") {
    if (handoverSuppressNextToggle) {
      handoverSuppressNextToggle = false;
      renderApp();
      return;
    }
    handoverWindowMinimized = !handoverWindowMinimized;
  }
  if (action === "close-ward-contact-modal") {
    wardContactModalOpen = false;
  }
  if (action === "close-other-ward-email-modal") {
    otherWardEmailModalOpen = false;
    otherWardEmailOpenFormAfterSave = false;
  }
  if (action === "close-notice-recipient-modal") {
    if (noticeRecipientRevealTimeout) {
      clearTimeout(noticeRecipientRevealTimeout);
      noticeRecipientRevealTimeout = null;
    }
    noticeRecipientModalOpen = false;
  }
  if (action === "complete-other-ward-email") {
    if (!otherWardRecipientEmailValue().trim()) return;
    const shouldOpenForm = otherWardEmailOpenFormAfterSave;
    otherWardEmailModalOpen = false;
    otherWardEmailOpenFormAfterSave = false;
    if (shouldOpenForm) {
      if (activeTab !== "visitLog") {
        noticeRecipientModalOpen = true;
        renderApp();
        return;
      }
      window.open(buildMicrosoftFormUrl(), "_blank", "noopener,noreferrer");
    }
  }
  if (action === "toggle-notice-recipient") {
    const noticeBody = document.querySelector(".notice-recipient-body");
    pendingNoticeRecipientScrollTop = noticeBody ? noticeBody.scrollTop : null;
    const email = target.dataset.email || "";
    const recipients = new Set(state.triage.noticeRecipients || []);
    if (recipients.has(email)) {
      recipients.delete(email);
    } else {
      recipients.add(email);
    }
    state.triage.noticeRecipients = Array.from(recipients);
  }
  if (action === "complete-notice-recipient") {
    noticeRecipientModalOpen = false;
    const formUrl = buildMicrosoftFormUrl();
    window.open(formUrl, "_blank", "noopener,noreferrer");
  }
  if (action === "complete-ward-contact") {
    const wardContactValue = activeTab === "visitLog" ? state.visitLog.callCategory.wardContact : state.triage.wardContact;
    if (!wardContactValue) return;
    wardContactModalOpen = false;
    if (activeTab === "visitLog") {
      state.currentVisitStep += 1;
    } else {
      state.currentStep += 1;
    }
  }
  if (action === "previous") {
    state.currentStep -= 1;
    if (getSteps()[state.currentStep]?.id === "triage") queueTriageQuestionCenter();
  }
  if (action === "next") {
    if (blockIncompleteCurrentStepIfNeeded()) return;
    state.currentStep += 1;
    if (getSteps()[state.currentStep]?.id === "triage") queueTriageQuestionCenter();
  }
  if (action === "visit-previous") state.currentVisitStep -= 1;
  if (action === "visit-next") {
    if (blockIncompleteCurrentVisitStepIfNeeded()) return;
    state.currentVisitStep += 1;
  }
  if (action === "generate") {
    generateStructuredSummary();
    epicSummaryCollapsed = false;
  }
  if (action === "preview-email") generateHtmlEmail();
  if (action === "open-ms-form") openPrefilledMicrosoftForm();
  if (action === "close-email-preview") {
    emailPreviewOpen = false;
  }
  if (action === "skip-email-open-form") {
    emailPreviewOpen = false;
    openPrefilledMicrosoftFormWithoutPrompt();
  }
  if (action === "reset") resetState();
  if (action === "toggle-live-map") {
    liveMapMinimized = !liveMapMinimized;
  }
  if (action === "toggle-summary") {
    summaryCollapsed = !summaryCollapsed;
  }
  if (action === "toggle-epic-summary") {
    epicSummaryCollapsed = !epicSummaryCollapsed;
  }
  if (action === "open-urgency-guide") {
    urgencyGuideOpen = true;
    selectedUrgencyGuide = currentRouteUrgency();
  }
  if (action === "close-urgency-guide") {
    urgencyGuideOpen = false;
    selectedUrgencyGuide = "";
  }
  if (action === "close-concern-help") {
    selectedConcernHelp = "";
  }
  if (action === "show-urgency-info") {
    selectedUrgencyGuide = target.dataset.urgency || currentRouteUrgency();
  }
  if (action === "set-step") {
    const requestedStep = Number(target.dataset.step) || 0;
    if (!canMoveToStep(requestedStep)) {
      renderApp();
      return;
    }
    state.currentStep = requestedStep;
    if (getSteps()[state.currentStep]?.id === "triage") queueTriageQuestionCenter();
  }
  if (action === "set-visit-step") {
    const requestedVisitStep = Number(target.dataset.step) || 0;
    if (!canMoveToVisitStep(requestedVisitStep)) {
      renderApp();
      return;
    }
    state.currentVisitStep = requestedVisitStep;
  }
  if (action === "set-tab") {
    activeTab = target.dataset.tab || "triage";
  }
  renderApp();
});

app.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && urgencyGuideOpen) {
    urgencyGuideOpen = false;
    selectedUrgencyGuide = "";
    renderApp();
    return;
  }

  if (event.key === "Escape" && selectedConcernHelp) {
    selectedConcernHelp = "";
    renderApp();
    return;
  }

  if (event.key === "Escape" && emailPreviewOpen) {
    emailPreviewOpen = false;
    renderApp();
    return;
  }

  if (event.key === "Escape" && processPosterOpen) {
    processPosterOpen = false;
    renderApp();
    return;
  }

  if (event.key === "Escape" && wardContactModalOpen) {
    wardContactModalOpen = false;
    renderApp();
    return;
  }

  if (event.key === "Escape" && otherWardEmailModalOpen) {
    otherWardEmailModalOpen = false;
    otherWardEmailOpenFormAfterSave = false;
    renderApp();
    return;
  }

  if (event.key === "Escape" && noticeRecipientModalOpen) {
    noticeRecipientModalOpen = false;
    renderApp();
    return;
  }

  if (event.key !== "Enter" && event.key !== " ") return;
  const target = event.target.closest(".sankey-click-node");
  if (!target) return;

  event.preventDefault();
  selectedUrgencyGuide = target.dataset.urgency || currentRouteUrgency();
  renderApp();
});

function isVisibleElement(element) {
  return Boolean(element && element.offsetParent !== null);
}

function firstFocusableIn(container) {
  if (!container) return null;
  return container.querySelector("input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])");
}

function getWorkflowFocusBlocks() {
  const root = document.querySelector(".workflow-card .card-body");
  if (!root) return [];
  return Array.from(root.querySelectorAll(".field, .choice-group, .details-card, .actions"))
    .filter((element) => isVisibleElement(element));
}

function focusNextExpectedControl(currentTarget) {
  const blocks = getWorkflowFocusBlocks();
  if (!blocks.length) return;

  const currentBlock = currentTarget.closest(".field, .choice-group, .details-card, .actions");
  const currentIndex = currentBlock ? blocks.indexOf(currentBlock) : -1;
  const nextBlock = blocks[currentIndex + 1];
  const nextControl = firstFocusableIn(nextBlock);
  if (nextControl) {
    nextControl.focus();
    if (typeof nextControl.select === "function" && (nextControl.tagName === "INPUT" || nextControl.tagName === "TEXTAREA")) {
      nextControl.select();
    }
  }
}

function moveWithinRadioGroup(target, direction) {
  if (target.type !== "radio" || !target.name) return false;
  const radios = Array.from(document.querySelectorAll(`input[type="radio"][name="${CSS.escape(target.name)}"]`))
    .filter((radio) => isVisibleElement(radio) && !radio.disabled);
  const currentIndex = radios.indexOf(target);
  if (currentIndex === -1 || radios.length < 2) return false;
  const nextIndex = (currentIndex + direction + radios.length) % radios.length;
  radios[nextIndex].checked = true;
  radios[nextIndex].dispatchEvent(new Event("change", { bubbles: true }));
  radios[nextIndex].focus();
  return true;
}

app.addEventListener("keydown", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (event.key === "Tab" && !event.shiftKey && target.closest(".workflow-card .card-body")) {
    event.preventDefault();
    focusNextExpectedControl(target);
    return;
  }

  if ((event.key === "ArrowDown" || event.key === "ArrowUp") && target instanceof HTMLInputElement) {
    const direction = event.key === "ArrowDown" ? 1 : -1;
    if (moveWithinRadioGroup(target, direction)) {
      event.preventDefault();
    }
  }
});

loadState();
loadThemePreference();
applyUrlPrefill();
loadWardContactDirectory().finally(renderApp);
