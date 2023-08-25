export const ROLE_PART = "ROLE_PART";
export const ROLE_PRO = "ROLE_PRO";
export const ROLE_PRE = "ROLE_PRE";
export const ROLE_NOT = "ROLE_NOT";
export const MESSAGES_CONTACT_VENDEUR = [
	"Votre bien m'intéresse. Pouvez-vous me fournir plus d'informations sur celui-ci afin de convenir d'une éventuelle visite ? Je vous remercie.",
	"J'ai trouvé votre propriété sur votre site. Pourrais-jeobtenir plus d'informations  ? Merci.",
	"J'ai trouvé votre propriété sur votre site. Pourrais-jeplanifier une visite  ? Merci.",
	"J'ai trouvé votre propriété sur votre site. Pourrais-jeconnaître l'adresse du bien  ? Merci.",
	"J'ai trouvé votre propriété sur votre site. Pourrais-jeobtenir plus d'informations et  planifier une visite  ? Merci.",
	"J'ai trouvé votre propriété sur votre site. Pourrais-jeobtenir plus d'informations et  connaître l'adresse du bien  ? Merci.",
	"J'ai trouvé votre propriété sur votre site. Pourrais-jeplanifier une visite et  connaître l'adresse du bien  ? Merci.",
	"J'ai trouvé votre propriété sur votre site. Pourrais-jeobtenir plus d'informations , planifier une visite et  connaître l'adresse du bien  ? Merci.",
];


export const STATUS = [
	{
		id: 0,
		title: "Refuser",
		class: "status-item__danger",
	},

	
	{
		id: 1,
		title: "Valider",
		class: "status-item__success mb-0",
	},
	{
		id: 2,
		title: "En attente",
		class: "status-item__warning",
	},
	{
		id: 3,
		title: "Occupé",
		vente: "Vendu",
		class: "status-item__short",
	},
	{
		id: 10,
		title: "Archiver",
		class: "status-item__danger",
	},
];

export const TYPEIMG = ["png", "jpg", "jpeg", "gif"];

export const percentageMountProperty  = 40;
export const percentageMountTenant  = 60;