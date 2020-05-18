export class EventInvitations {

    idEvent: Number;
    invitations: Invitation[];

}
export class I_Response{
    question: String;
    response: String;
}

export class I_Wellness{
    Wellness: String;
}

export class Invitation{
    name: String;
    surname: String;
    code: String;
    confirmed: Boolean;
    member: Boolean;
    alergenics: I_Wellness[];
    functionality: I_Wellness[];
    Responses: I_Response[];
}