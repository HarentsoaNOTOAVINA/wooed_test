import { IRegulation } from './interfaceDataRegulation';

export const regulationMaintainsTankFlandre: IRegulation[] = [
    {
        paraBold: [
            {
                enterBold:
                    'Citernes avec une capacité de moins de 5000 kg (6000 litres):',
            },
        ],
        title: 'Fréquence',
        frequency: [
            {
                // titleFreq: 'Réservoir enfoui ou non accessible',
                contentFreq: [
                    {
                        type: 'ondergrondse stookolietank',
                        dateInspect: 'Tous les 5 ans',
                    },
                    {
                        type: 'bovengrondse stookolietan',
                        dateInspect:
                            'Ce type de citerne n’est pas soumis à une obligation de contrôle régulier​',
                    },
                ],
            },
        ],
    },
    {
        paraBold: [
            {
                enterBold:
                    'Citernes avec une capacité de 5000 kg (6000 litres) ou plus: (sans symbole GHS02):',
            },
            {
                enterBold:
                    'Citernes avec une capacité de 5000 kg (6000 litres) ou plus: (sans symbole GHS02):',
            },
        ],
        title: 'Fréquence',
        frequency: [
            {
                titleFreq: 'ondergrondse stookolietank',
                contentFreq: [
                    {
                        type: 'La citerne se trouve en zone de prévention et/ou de protection (waterwingebieden en beschermingszones)',
                        subContent: [
                            {
                                age: 'Contrôle limité',
                                date: 'Tous les ans',
                            },
                            {
                                age: 'Contrôle général',
                                date: 'Tous les 10 ans',
                            },
                        ],
                    },
                    {
                        type: 'La citerne se trouve en zone de prévention et/ou de protection (waterwingebieden en beschermingszones)',
                        subContent: [
                            {
                                age: 'Contrôle limité',
                                date: 'Tous les 2 ans',
                            },
                            {
                                age: 'Contrôle général',
                                date: 'Tous les 15 ans',
                            },
                        ],
                    },
                ],
            },
            {
                titleFreq: 'bovengrondse stookolietank',
                contentFreq: [
                    {
                        type: 'Contrôle limité',
                        dateInspect: 'Tous les 3 ans',
                    },
                    {
                        type: 'Contrôle général',
                        dateInspect: 'Tous les 20 ans',
                    },
                ],
            },
        ],
    },
    {
        title: 'Etendue du contrôle',
        article: [
            {
                titleArt: 'Contrôle limité',
                numberArt: 'Art. 5.17.2.8, §1',
                contentArt:
                    'Ten minste om het jaar voor de houders gelegen binnen de waterwingebieden en de beschermingszones en om de​ twee jaar voor de houders gelegen in de andere gebieden wordt de installatie onderworpen aan een beperkt onderzoek, omvattende​ indien relevant :​',
                listeArt: [
                    {
                        liste: 'de inzage van het vorig rapport of attest;',
                    },
                    {
                        liste: 'de controle op de goede staat van de overvulbeveiliging;',
                    },
                    {
                        liste: 'de controle op de aanwezigheid van water en slib in de enkelwandige houder voor vloeibare brandstoffen (bijlage 5.17.4.) [,voor​ zover mogelijk en zonder dat de houder daarvoor dient blootgelegd. Bij materiële onmogelijkheid deze controle uit te voeren,​ dient een dichtheidsbeproeving, overeenkomstig de bepalingen van artikel 5.17.2.8 §2, 5° te worden uitgevoerd;]Gewijzigd bij art. 26 B.Vl.Reg. 28 november 2003, B.S. 13 februari 2004 (eerste editie).',
                    },
                    {
                        liste: 'een onderzoek naar zichtbare of organoleptisch waarneembare verontreiniging aan de oppervlakte buiten de houder (bijlage​ 5.17.4.);',
                    },
                    {
                        liste: 'een onderzoek van de staat van de uitwendige zichtbare delen van de houder, de afsluiters, leidingen, pompen, e.a.;',
                    },
                    {
                        liste: 'de controle op de doeltreffendheid van de eventuele aanwezige kathodische bescherming of corrosiemonitoring;',
                    },
                    {
                        liste: 'de controle op de doeltreffendheid van het lekdetectiesysteem; ',
                    },
                ],
            },
            {
                titleArt: 'Contrôle général',
                numberArt: 'Art. 5.17.2.8, §2',
                contentArt: '(…)een algemeen onderzoek, omvat(tende) :',
                listeArt: [
                    {
                        liste: 'de staat van de binnenwand bij een vastgestelde belangrijke aanwezigheid van water of slib; indien een inwendige inspectie​ vereist is wordt de houder inwendig gereinigd; voorzover technisch mogelijk, worden de binnenwand en de inwendige delen van​ de houder onderzocht en wordt waar nodig een niet-destructief onderzoek uitgevoerd om de wanddikte van de houder te bepalen; de staat van de buitenbekleding, voorzover technisch mogelijk en zonder dat de houder daarvoor dient blootgelegd;',
                    },
                    {
                        liste: 'in voorkomend geval, met name de situatie als beschreven in artikel 5.17.2.4, §3, de detectie van eventueel optredende corrosie​ aan de hand van een potentiaalmeting en een meting van de corrosiviteit van de aanpalende bodem;',
                    },
                    {
                        liste: 'een dichtheidsbeproeving op rechtstreeks in de grond ingegraven enkelwandige houders bij een overdruk van minstens 30 kPa​ gedurende minimum 1 uur of bij een onderdruk van hoogstens 30 kPa; beproeving bij een overdruk van meer dan 30 kPa mag​ enkel geschieden indien de houders daartoe volledig worden gevuld met water; niet toegankelijke enkelwandige leidingen moeten​ worden beproefd bij een overdruk van tenminste 30 kPa gedurende 1 uur of bij een onderdruk van ten hoogste 30 kPa; een​ gelijkwaardige beproeving, waarbij maximaal gezocht wordt naar het detecteren van niet-dichte tanks en/of het classificeren van​ tanks naargelang de kwaliteitstoestand, uitgevoerd overeenkomstig een door de afdeling [, bevoegd voor milieuvergunningen]​ aanvaarde code van goede praktijk, is eveneens toegelaten.',
                    },
                    {
                        liste: 'es ascenseurs de chantier ;',
                    },
                ],
            },
            {
                numberArt: 'Art. 5.17.2.8, §3',
                contentArt:
                    'De periodieke onderzoeken, bedoeld in §1 en §2, moeten worden uitgevoerd door een milieudeskundige erkend in de discipline houders voor gassen of gevaarlijke stoffen of door een bevoegd deskundige of voor opslagplaatsen van P3- en/of P4-producten bestemd voor de verwarming van gebouwen door een erkend technicus.​ De controle met betrekking tot corrosie en kathodische bescherming dient te gebeuren in samenwerking met een milieudeskundige ,erkend in de discipline bodemcorrosie',
            },
            {
                titleArt: 'Contrôle limité',
                numberArt: 'Art. 5.17.3.16. §1',
                contentArt: 'Dit onderzoek omvat indien relevant :',
                listeArt: [
                    {
                        liste: 'de inzage van het vorig rapport of attest;',
                    },
                    {
                        liste: 'de controle op de goede staat van de overvulbeveiliging;',
                    },
                    {
                        liste: 'een onderzoek naar zichtbare of organoleptisch waarneembare verontreiniging aan de oppervlakte buiten de houder volgens de​ bepalingen van bijlage 5.17.4;',
                    },
                ],
                subList: [
                    {
                        titleSubList:
                            'het onderzoek van de algemene staat van de installatie, omvattende :',
                        contentSubList: [
                            {
                                listeSub:
                                    'het opsporen van lekken en lekaanwijzingen;',
                            },
                            {
                                listeSub:
                                    'het onderzoek van de staat van de platen, de verbindingen en de stompen van de houder;',
                            },
                            {
                                listeSub:
                                    'het onderzoek van de staat van de toebehoren als: afsluiters, temperatuur-, druk-, niveaumeting en aarding;​',
                            },
                            {
                                listeSub:
                                    'het onderzoek van de drukbeveiligings- en alarmtoestellen;​​',
                            },
                            {
                                listeSub:
                                    'het onderzoek van de staat van de buitenbekleding, hetzij de schildering en/of de isolatie;​​​',
                            },
                            {
                                listeSub:
                                    'het onderzoek van de funderingen en/of steunblokken met het oog op de stabiliteit en de afwatering;​​​​',
                            },
                            {
                                listeSub:
                                    'het onderzoek van de inkuiping voor wat betreft inhoud, dichtheid, verontreiniging, peilputten;​​​​​',
                            },
                            {
                                listeSub:
                                    'het onderzoek van de staat van de leidingen en de toebehoren binnen de inkuiping.​ bovendien moet voor verticale houders :​​​​​​',
                            },
                            {
                                listeSub:
                                    'waar nodig, een niet-destructief onderzoek uitgevoerd worden op de mantel en de dakplaten van de houders om de​ plaatdikte en eventuele corrosie, zowel in als uitwendig te bepalen;​​​​​​​',
                            },
                            {
                                listeSub:
                                    'op vraag van de milieudeskundige of de bevoegde deskundige de zetting bepaald worden, door de hoogte te meten​ van een aantal gelijkmatig over de omtrek van de bodemrand verdeelde punten.​​',
                            },
                            {
                                listeSub:
                                    'Het onderzoek van de staat van de eventueel aanwezige emissiebeperkende maatregelen, met uitzondering van intern​ vlottende daken. Toegevoegd bij art. 21 B.Vl.Reg. 19 juni 2009, B.S. 28 augustus 2009.​​',
                            },
                            {
                                listeSub:
                                    'de controle op de doeltreffendheid van de voorzieningen voor de damprecuperatie;',
                            },
                        ],
                    },
                ],
            },
            {
                titleArt: 'Contrôle général',
                numberArt: 'Art. 5.17.3.16, §2',
                contentArt:
                    'Voorafgaand aan dit onderzoek moet de houder inwendig worden gereinigd.​ Dit onderzoek omvat :',
                listeArt: [
                    {
                        liste: 'het beperkt onderzoek, bedoeld in §1;',
                    },
                    {
                        liste: 'het onderzoek op de staat van de binnenwand;',
                    },
                    {
                        liste: 'voor verticale houders omvat het onderzoek bovendien:',
                    },
                ],
                subList: [
                    {
                        contentSubList: [
                            {
                                listeSub:
                                    'het onderzoek van de staat van het vakwerk en de inwendige toebehoren zoals afsluiters, verwarmingsspiralen, dak- en​ bodemwateraflaten en afdichtingen van de vlottende daken;',
                            },
                            {
                                listeSub:
                                    'het onderzoek van de bodemplaten voor het opsporen van in- en uitwendige corrosie',
                            },
                            {
                                listeSub:
                                    'het onderzoek van bodemvervorming en eventueel het opmeten van het profiel;​',
                            },
                        ],
                    },
                ],
                contentFooterArt:
                    'Evenwaardige onderzoeken kunnen worden uitgevoerd zonder de houder inwendig te reinigen. De periodieke herhaling dient in dit geval korter te zijn dan om de 20 jaar en deze termijn dient vastgelegd te worden op basis van een risicoanalyse uitgevoerd door een milieudeskundige erkend in de discipline houders voor gassen of gevaarlijke stoffen. Elk deelonderzoek dient uitgevoerd volgens een​ code van goede praktijk aanvaard door een milieudeskundige erkend in de discipline houders voor gassen of gevaarlijke stoffen.​',
            },
            {
                numberArt: 'Art. 5.17.3.16,§3',
                contentArt:
                    'De periodieke onderzoeken dienen uitgevoerd te worden door een milieudeskundige erkend in de discipline houders voor gassen of gevaarlijke stoffen of door een bevoegd deskundige of voor de opslag van P3- en/of P4-producten bestemd voor de verwarming van​ gebouwen door een erkend technicus',
            },
        ],
    },

    {
        title: 'Actions requises',
        article: [
            {
                numberArt: 'Art. 5.17.2.9',
                contentArt:
                    'Naar aanleiding van de in artikel 5.17.2.7 bedoelde controle bij de plaatsing en/of de in artikel 5.17.2.8 bedoelde​ periodieke onderzoeken stellen de deskundigen of de erkend technicus een attest op waaruit ondubbelzinnig moet blijken of de houder en de installatie al dan niet voldoen aan de voorschriften van dit reglement. Voormeld conformiteitsattest vermeldt bovendien de naam en het erkenningsnummer van de deskundige of erkend technicus, die het onderzoek heeft uitgevoerd.​ [Zij brengen op de vulleiding een duidelijk zichtbare en leesbare klever of plaat aan, waarop zijn erkenningsnummer, het jaartal en de maand van hetzij de controle bij de plaatsing hetzij de laatst uitgevoerde controle en van de volgende uit te voeren controle vermeld zijn.]​ De klever of plaat dient volgende kleur te hebben :​​',
                listeArt: [
                    {
                        liste: 'oranje, wanneer de houder en de installatie niet voldoen aan de bepalingen van dit reglement doch de vastgestelde gebreken​ geen aanleiding kunnen geven tot verontreiniging buiten de houder;​',
                    },
                    {
                        liste: 'rood, wanneer de houder en de installatie niet voldoen aan de bepalingen van dit reglement en de vastgestelde gebreken​ aanleiding kunnen geven of hebben gegeven tot verontreiniging buiten de houder.​',
                    },
                    {
                        liste: 'groen, wanneer de houder en de installatie voldoen aan de bepalingen van dit reglement;',
                    },
                ],
            },
            {
                numberArt: 'Art. 5.17.2.10',
                contentArt:
                    'Alleen houders waarvan de vulleiding voorzien is van een groene klever of plaat, bedoeld in artikel 5.17.2.9, mogen​ worden gevuld, bijgevuld en geëxploiteerd.​ Houders waarvan de vulleiding voorzien is van een oranje klever of plaat, bedoeld in artikel 5.17.2.9, mogen nog worden gevuld of​ bijgevuld tijdens een overgangsperiode van maximum 6 maanden die ingaat de eerste van de maand volgend op de maand vermeld op de bedoelde oranje klever of plaat. In dit geval dient een nieuwe controle uitgevoerd vóór het verstrijken van voormelde termijn.​ [Het is verboden houders waarvan de vulleiding voorzien is van een rode klever of plaat, bedoeld in artikel 5.17.2.9, te vullen of te laten vullen. De exploitant dient alle nodige maatregelen te treffen, overeenkomstig het verslag van de erkende milieudeskundige, om de opslaginstallatie terug in goede staat te brengen waarna de opslaginstallatie terug aan een controle dient onderworpen. Binnen de veertien dagen nadat een rode klever of plaat aangebracht werd maakt de exploitant of op zijn verzoek de erkende milieudeskundige hiervan melding bij de afdeling van de Vlaamse Milieumaatschappij bevoegd voor grondwater.]​',
            },
            {
                numberArt: 'Art. 5.17.2.12. §1',
                contentArt:
                    'Indien lekken worden vastgesteld treft de exploitant alle nodige maatregelen om explosiegevaar te voorkomen en verdere bodem- en grondwaterverontreiniging zoveel mogelijk te beperken.​ §2. Na vakkundige herstelling mag de houder slechts terug in gebruik worden genomen mits deze een geslaagde dichtheidsbeproeving zoals bepaald in artikel 5.17.2.8 heeft ondergaan​​',
            },
        ],
    },
    {
        article: [
            {
                numberArt: 'Art. 5.17.3.17',
                contentArt:
                    'Naar aanleiding van de in artikel 5.17.3.4 bedoelde controle bij de plaatsing en/of de in artikel 5.17.3.16 bedoelde​ periodieke onderzoeken stellen de deskundigen of de erkend technicus een attest op waaruit ondubbelzinnig moet blijken of de houder en de installatie al dan niet voldoen aan de voorschriften van dit reglement. Het bovengenoemde attest vermeldt bovendien de naam en het erkenningsnummer van de deskundige of erkend technicus, die het onderzoek heeft uitgevoerd.​ [Behalve in het geval van een tankenpark brengen zij op of nabij de vulleiding een duidelijk zichtbare en leesbare klever of plaat aan,​ waarop zijn erkenningsnummer, het jaartal en de maand van hetzij de controle bij de plaatsing, hetzij de laatst uitgevoerde controle, en van de volgende uit te voeren controle vermeld zijn.]​ De klever of plaat heeft volgende kleur :​​​',
                listeArt: [
                    {
                        liste: 'oranje, wanneer de houder en de installatie niet voldoen aan de bepalingen van dit reglement doch de vastgestelde gebreken​ geen aanleiding kunnen geven tot verontreiniging buiten de houder;​​',
                    },
                    {
                        liste: 'rood, wanneer de houder en de installatie niet voldoen aan de bepalingen van dit reglement en de vastgestelde gebreken​ aanleiding kunnen geven of hebben gegeven tot verontreiniging buiten de houder.​ Gewijzigd bij art. 36 B.Vl.Reg. 28 november 2003, B.S. 13 februari 2004 (eerste editie).​',
                    },
                    {
                        liste: 'groen, wanneer de houder en de installatie voldoen aan de bepalingen van dit reglement;​',
                    },
                ],
            },
            {
                numberArt: 'Art. 5.17.3.18',
                contentArt:
                    'Alleen houders waarvan de vulleiding voorzien is van een groene klever of plaat, bedoeld in artikel 5.17.3.17, derde lid,1°, mogen worden gevuld, bijgevuld en geëxploiteerd.​ Houders waarvan de vulleiding voorzien is van een oranje klever of plaat, bedoeld in artikel 5.17.3.17, derde lid, 2°, mogen nog worden gevuld of bijgevuld tijdens een overgangsperiode van maximum zes maanden. Die gaat in op de eerste van de maand die volgt op de maand, vermeld op de bedoelde oranje klever of plaat. In dit geval dient een nieuwe controle te worden uitgevoerd vóór het verstrijken van voormelde termijn.​ [Het is verboden houders waarvan de vulleiding voorzien is van een rode klever of plaat, bedoeld in artikel 5.17.3.17, te vullen of te​ laten vullen. De exploitant dient alle nodige maatregelen te treffen, overeenkomstig het verslag van de erkende milieudeskundige, om de opslaginstallatie terug in goede staat te brengen waarna de opslaginstallatie terug aan een controle dient onderworpen. Binnen de veertien dagen nadat een rode klever of plaat aangebracht werd maakt de exploitant of op zijn verzoek de erkende milieudeskundige hiervan melding bij de afdeling van de Vlaamse Milieumaatschappij bevoegd voor grondwater.​​',
            },
            {
                numberArt: 'Art. 5.17.3.20. §1',
                contentArt:
                    'Indien lekken worden vastgesteld treft de exploitant de nodige maatregelen om explosiegevaar te voorkomen en om verdere bodem- en grondwaterverontreiniging zoveel mogelijk te beperken.​ §2. Na vakkundige herstelling mag de houder slechts opnieuw in gebruik worden genomen indien een attest werd afgeleverd door een milieudeskundige erkend in de discipline houders voor gassen of gevaarlijke stoffen of door een bevoegd deskundige of voor de opslag van P3- en/of P4-producten bestemd voor de verwarming van gebouwen door een erkend technicus. Hieruit moet ondubbelzinnig blijken dat de houder en de installatie voldoen aan de voorschriften van dit besluit.​​',
            },
        ],
    },
];
