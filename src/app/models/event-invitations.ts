export class EventInvitations {

    idEvent: Number;
    invitations: Invitation[];

}
export class I_Response{
    question: String;
    response: String;
}

export class I_Wellness{
    idWellness: Number;
}

export class Invitation{
    name: String;
    surname: String;
    code: String;
    confirmed: Boolean;
    Wellness: I_Wellness[];
    Responses: I_Response[];
}