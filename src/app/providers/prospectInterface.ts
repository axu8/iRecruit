export class Prospect {
    Prospect: {
        FirstName: string;
        LastName: string;
        EmailAddress: string;
        MobilePhoneNumber: string;
        DoNotCallIndicator: boolean;
        Address: string;
        Address2: string;
        City: string;
        State: string;
        PostalCode: string;
        Id:number;
    }

    Opportunity:{
		AdmissionStage: string,
		Campaign: string,
		//CreatedDateTime:\/Date(928171200000-0600)\/,
		//DeliveryMode: string,
		//ExternalProviderIdentifier: string,
		//IsDefault:true,
		//LeadProvider: string,
		//LeadSource: string,
		//ModifiedDateTime:\/Date(928171200000-0600)\/,
		//OpportunityId:2147483647,
		Program: string,
		ProspectId:2147483647,
		//StartDate:\/Date(928171200000-0600)\/,
		//Term: string
	}

    CustomFieldValues:[
        {
            FieldName: string;
            Value: string;
        }
    ]

    OpportunityCustomFieldValues:[
        {
            FieldName: string;
            Value: string;
        }
    ]
    
  
    constructor(){}
  }