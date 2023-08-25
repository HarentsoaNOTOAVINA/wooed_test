interface IContentFreq {
    type?: string;
    dateInspect?: string;
    link?: string;
    subContent?: {
        age?: string;
        date?: string;
    }[];
}

interface ISubListArt {
    titleSubList?: string;
    contentSubList?: { listeSub?: string }[];
}

interface IArticle {
    titleArt?: string;
    numberArt?: string;
    subTitleArt?: string;
    contentArt?: string;
    listeArt?: { liste?: string }[];
    subList?: ISubListArt[];
    contentFooterArt?: string;
}

interface IFrequency {
    titleFreq?: string;
    inspectFreq?: string;
    contentFreq?: IContentFreq[];
}

interface IExtentControl {
    type?: string;
    definition?: string;
}

interface IRequiredAction {
    question?: string;
    response?: string;
}

export interface IRegulation {
    paraBold?: { enterBold: string }[];
    paraSimple?: string;
    title?: string;
    titleContentArt?: string;
    article?: IArticle[];
    frequency?: IFrequency[];
    extentControl?: IExtentControl[];
    requiredAction?: IRequiredAction[];
}
