export interface Patient {
  userid: string;
  mobilenumber: string;
  emailaddress: string;
  fname: string;
  lname: string;
  dobad: string;
  dobbs: string;
  gender: string;
  distritid: string;
  vdcid: string;
  wardno: string;
  address: string;
  status: string;
  countrycode: string;
  user_type: string;
  userrelationid: string;
  relationid: string;
  relationmobile: string;
  usercode: string;
  appname: string;
  image: string;
  isaddrelative: string;
  logintype: string;
  is_active: string;
  isnijamatistaff: string;
  isactive: string;
  isoldpatient_flow: string;
  hospitalno: string;
  districtname: string;
  relativemidasuserid: string;
  mobileno: string;
  relationname: string;
}

/** Represents the logged-in user's own info */
export interface MyProfile {
  midasid: string;
  orgid: string;
  mobilenumber: string;
  emailaddress: string;
  fname: string;
  lname: string;
  dobad: string;
  dobbs: string;
  gender: string;
  distritid: string;
  vdcid: string;
  wardno: string;
  address: string;
  password: string;
  createddate: string;
  createdtime: string;
  countrycode: string;
  defaultpassword: string;
  user_type: string;
  appversion: string;
  usercode: string;
  appname: string;
  image: string;
  bloodgroup: string;
  userid: string;
  districtname: string;
  vdcname: string;
}

/** API Response Structure */
export interface FetchPatientsResponse {
  type: string; // "success" | "error"
  message: string;
  response: {
    list: Patient[];
    my: MyProfile;
  };
}

/** Add Patient Payload */
export interface AddPatientPayload {
  fname: string;
  lname: string;
  age: string;
  agetype: 'Years' | 'Months' | 'Days';
  countrycode: string;
  mobileno: string;
  email?: string;
  gender: 'Male' | 'Female' | 'Other';
  relationid: string;
  address?: string;
  districtid: string;
  vdcid: string;
  wardno: string;
  addtorelative: 'Y' | 'N';
  userid: string; // logged-in user id
  orgid: string; // org id (614)
}

