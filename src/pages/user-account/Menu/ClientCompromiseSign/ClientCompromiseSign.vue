<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import MakeOffer from '@/services/offerService';
    import CompromisesSign from '@/pages/make-offer/compromisesSign/CompromisesSign.vue';
    const html = ref<Array<string>>([
        `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
<head>
<title></title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
 <br/>
<style type="text/css">
<!--
	p {margin: 0; padding: 0;}	.ft10{font-size:20px;font-family:Times;color:#ffac00;}
	.ft11{font-size:11px;font-family:Times;color:#575756;}
	.ft12{font-size:11px;font-family:Times;color:#575756;}
	.ft13{font-size:13px;font-family:Times;color:#00694e;}
	.ft14{font-size:14px;font-family:Times;color:#575756;}
	.ft15{font-size:11px;font-family:Times;color:#00694e;}
	.ft16{font-size:13px;font-family:Times;color:#575756;}
	.ft17{font-size:14px;font-family:Times;color:#575756;}
	.ft18{font-size:13px;font-family:Times;color:#ffffff;}
	.ft19{font-size:7px;font-family:Times;color:#00694e;}
	.ft110{font-size:8px;font-family:Times;color:#575756;}
	.ft111{font-size:9px;font-family:Times;color:#575756;}
	.ft112{font-size:8px;font-family:Times;color:#575756;-moz-transform: matrix(         0,         -1,          1,          0, 0, 0);-webkit-transform: matrix(         0,         -1,          1,          0, 0, 0);-o-transform: matrix(         0,         -1,          1,          0, 0, 0);-ms-transform: matrix(         0,         -1,          1,          0, 0, 0);-moz-transform-origin: left 75%;-webkit-transform-origin: left 75%;-o-transform-origin: left 75%;-ms-transform-origin: left 75%;}
-->
</style>
</head>
<body bgcolor="#A0A0A0" vlink="blue" link="blue">
<div id="page1-div" style="position:relative;width:892px;height:1262px;">
<p style="position:absolute;top:55px;left:261px;white-space:nowrap" class="ft10"><b>DÉMÉNAGEMENT&#160;/&#160;CHANGEMENT&#160;DE&#160;CLIENT</b></p>
<p style="position:absolute;top:84px;left:545px;white-space:nowrap" class="ft11">À renvoyer&#160;<b>par e-mail</b>&#160;à contact@vivaqua.be ou&#160;&#160;</p>
<p style="position:absolute;top:101px;left:413px;white-space:nowrap" class="ft12"><b>par courrier</b>&#160;à VIVAQUA –Bd de l’Impératrice 17-19 – 1000 Bruxelles.</p>
<p style="position:absolute;top:121px;left:60px;white-space:nowrap" class="ft13"><b>ADRESSE DE CONSOMMATION&#160;</b></p>
<p style="position:absolute;top:121px;left:833px;white-space:nowrap" class="ft13"><b>&#160;</b></p>
<p style="position:absolute;top:142px;left:60px;white-space:nowrap" class="ft14">Rue&#160;&#160;.............................................................................................................&#160;&#160;N°&#160;&#160;.......................&#160;&#160;Bte&#160;...............</p>
<p style="position:absolute;top:165px;left:60px;white-space:nowrap" class="ft14">N°&#160;appartement&#160;&#160;....................................................&#160;&#160;Étage&#160;.&#160;.....................&#160;&#160;&#160;&#160;Gauche &#160;&#160;&#160;Milieu &#160;&#160;&#160;&#160;Droite&#160;&#160;&#160;</p>
<p style="position:absolute;top:187px;left:60px;white-space:nowrap" class="ft14">Code postal&#160;............................&#160;Commune&#160;&#160;......................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:222px;left:60px;white-space:nowrap" class="ft13"><b>DONNÉES DU COMPTEUR</b></p>
<p style="position:absolute;top:239px;left:469px;white-space:nowrap" class="ft15"><b>N° DE COMPTEUR&#160; &#160; &#160; &#160;</b></p>
<p style="position:absolute;top:282px;left:469px;white-space:nowrap" class="ft15"><b>DATE DU RELEVÉ</b></p>
<p style="position:absolute;top:282px;left:69px;white-space:nowrap" class="ft15"><b>INDEX&#160;ACTUEL</b></p>
<p style="position:absolute;top:328px;left:60px;white-space:nowrap" class="ft13"><b>CLIENT SORTANT&#160;</b></p>
<p style="position:absolute;top:328px;left:656px;white-space:nowrap" class="ft13"><b>&#160;</b></p>
<p style="position:absolute;top:328px;left:661px;white-space:nowrap" class="ft16">LANGUE&#160;&#160;&#160;&#160;FR&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;NL</p>
<p style="position:absolute;top:349px;left:60px;white-space:nowrap" class="ft14">N° de client&#160;&#160;..............................................&#160;&#160;&#160;<b>Je suis &#160;&#160;&#160;propriétaire&#160; &#160; &#160; &#160;&#160;&#160;locataire&#160; &#160; &#160; &#160;&#160;&#160;mandataire&#160;</b></p>
<p style="position:absolute;top:371px;left:60px;white-space:nowrap" class="ft14">Nom(s) ou Nom de la société&#160;&#160;.......................................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:394px;left:60px;white-space:nowrap" class="ft14">Prénom(s)&#160;.......................................................................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:416px;left:60px;white-space:nowrap" class="ft14">Registre&#160;national&#160;&#160;...............................................................&#160;ou N° d’entreprise&#160;&#160;............................................</p>
<p style="position:absolute;top:439px;left:60px;white-space:nowrap" class="ft14">Téléphone&#160;&#160;.....................................................................................................................................................</p>
<p style="position:absolute;top:461px;left:60px;white-space:nowrap" class="ft14">N° de compte BE&#160;...........................................................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:463px;left:833px;white-space:nowrap" class="ft13"><b>&#160;</b></p>
<p style="position:absolute;top:484px;left:60px;white-space:nowrap" class="ft17"><b>Je souhaite que la facture de clôture soit envoyée</b></p>
<p style="position:absolute;top:506px;left:121px;white-space:nowrap" class="ft14">&#160;par e-mail&#160;&#160;........................................................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:529px;left:121px;white-space:nowrap" class="ft14">&#160;par&#160;courrier&#160;&#160;&#160;Rue&#160;&#160;&#160;.....................................................................................&#160;&#160;N°&#160;...............&#160;Bte&#160;...............</p>
<p style="position:absolute;top:551px;left:218px;white-space:nowrap" class="ft14">Code postal&#160;...............&#160;Commune&#160;....................................&#160;Pays&#160;...........................................</p>
<p style="position:absolute;top:601px;left:60px;white-space:nowrap" class="ft13"><b>PROPRIÉTAIRE OU MANDATAIRE (À COMPLÉTER EN CAS DE LOCATION)&#160;</b></p>
<p style="position:absolute;top:601px;left:598px;white-space:nowrap" class="ft18"><b>&#160;</b></p>
<p style="position:absolute;top:601px;left:661px;white-space:nowrap" class="ft16">LANGUE&#160;&#160;&#160;&#160;FR&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;NL</p>
<p style="position:absolute;top:622px;left:60px;white-space:nowrap" class="ft14">N° de client&#160;&#160;..............................................&#160;&#160;&#160;<b>Je suis &#160;&#160;&#160;propriétaire&#160; &#160; &#160; &#160;&#160;&#160;locataire&#160; &#160; &#160; &#160;&#160;&#160;mandataire&#160;</b></p>
<p style="position:absolute;top:644px;left:60px;white-space:nowrap" class="ft14">Nom(s) ou Nom de la société&#160;&#160;.......................................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:667px;left:60px;white-space:nowrap" class="ft14">Prénom(s)&#160;.......................................................................................................................................................</p>
<p style="position:absolute;top:689px;left:60px;white-space:nowrap" class="ft14">Téléphone&#160;.................................................&#160;E-mail&#160;&#160;.............................................................................................</p>
<p style="position:absolute;top:712px;left:60px;white-space:nowrap" class="ft14">N° de compte BE&#160;...........................................................................................................................................&#160;&#160;&#160;</p>
<p style="position:absolute;top:734px;left:60px;white-space:nowrap" class="ft14">Rue&#160;&#160;&#160;......................................................................................................................&#160;&#160;N°&#160;...............&#160;Bte&#160;...............&#160;</p>
<p style="position:absolute;top:757px;left:60px;white-space:nowrap" class="ft14">Code postal&#160;....................................&#160;Commune&#160;....................................&#160;Pays&#160;&#160;.....................................................</p>
<p style="position:absolute;top:806px;left:60px;white-space:nowrap" class="ft13"><b>NOUVEAU CLIENT</b></p>
<p style="position:absolute;top:806px;left:195px;white-space:nowrap" class="ft18"><b>&#160;</b></p>
<p style="position:absolute;top:806px;left:623px;white-space:nowrap" class="ft18"><b>........</b></p>
<p style="position:absolute;top:806px;left:661px;white-space:nowrap" class="ft16">LANGUE&#160;&#160;&#160;&#160;FR&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;NL</p>
<p style="position:absolute;top:827px;left:60px;white-space:nowrap" class="ft14">N° de client&#160;&#160;..............................................&#160;&#160;&#160;<b>Je suis &#160;&#160;&#160;propriétaire&#160; &#160; &#160; &#160;&#160;&#160;locataire&#160; &#160; &#160; &#160;&#160;&#160;mandataire&#160;</b></p>
<p style="position:absolute;top:850px;left:60px;white-space:nowrap" class="ft14">Nom(s) ou Nom de la société&#160;&#160;.......................................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:872px;left:60px;white-space:nowrap" class="ft14">Prénom(s)&#160;.......................................................................................................................................................</p>
<p style="position:absolute;top:895px;left:60px;white-space:nowrap" class="ft14">Registre&#160;national&#160;&#160;...............................................................&#160;ou N° d’entreprise&#160;&#160;............................................</p>
<p style="position:absolute;top:917px;left:60px;white-space:nowrap" class="ft14">Téléphone&#160;.................................................&#160;E-mail&#160;&#160;.............................................................................................</p>
<p style="position:absolute;top:940px;left:60px;white-space:nowrap" class="ft14">N° de compte BE&#160;...........................................................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:962px;left:60px;white-space:nowrap" class="ft17"><b>Nombre de personnes domiciliées à l’adresse&#160;</b></p>
<p style="position:absolute;top:965px;left:396px;white-space:nowrap" class="ft11">(important pour estimer le montant de vos factures d’acompte)&#160;&#160;</p>
<p style="position:absolute;top:962px;left:749px;white-space:nowrap" class="ft14">&#160;.................</p>
<p style="position:absolute;top:985px;left:78px;white-space:nowrap" class="ft14">&#160;<b>Je souhaite domicilier mes factures</b>&#160;</p>
<p style="position:absolute;top:1007px;left:78px;white-space:nowrap" class="ft14">&#160;Je souhaite que mes factures soient envoyées à une autre adresse que l’adresse de consommation</p>
<p style="position:absolute;top:1030px;left:60px;white-space:nowrap" class="ft14">Rue&#160;&#160;&#160;......................................................................................................................&#160;&#160;N°&#160;...............&#160;Bte&#160;...............&#160;</p>
<p style="position:absolute;top:1052px;left:60px;white-space:nowrap" class="ft14">Code postal&#160;....................................&#160;Commune&#160;....................................&#160;Pays&#160;&#160;.....................................................</p>
<p style="position:absolute;top:1096px;left:71px;white-space:nowrap" class="ft13"><b>SIGNATURE&#160;CLIENT&#160;SORTANT</b></p>
<p style="position:absolute;top:1096px;left:348px;white-space:nowrap" class="ft13"><b>SIGNATURE&#160;PROPRIÉTAIRE</b></p>
<p style="position:absolute;top:1096px;left:600px;white-space:nowrap" class="ft13"><b>SIGNATURE NOUVEAU CLIENT</b></p>
<p style="position:absolute;top:1116px;left:598px;white-space:nowrap" class="ft19"><b>(OU DU PROPRIÉTAIRE SI PAS DE NOUVEAU CLIENT)</b></p>
<p style="position:absolute;top:1176px;left:60px;white-space:nowrap" class="ft110"><i>En signant ce formulaire les parties déclarent avoir&#160;pris connaissance et accepté les Conditions générales consultables sur www.vivaqua.be ou&#160;</i></p>
<p style="position:absolute;top:1188px;left:60px;white-space:nowrap" class="ft110"><i>envoyées&#160;sur&#160;simple&#160;demande.&#160;VIVAQUA&#160;accorde&#160;une&#160;grande&#160;importance&#160;à&#160;la&#160;protection&#160;des&#160;données&#160;à&#160;caractère&#160;personnel&#160;qu’elle&#160;est&#160;amenée&#160;à&#160;</i></p>
<p style="position:absolute;top:1201px;left:60px;white-space:nowrap" class="ft110"><i>traiter.&#160;Vous&#160;trouverez&#160;toutes&#160;les&#160;informations&#160;nécessaires&#160;sur&#160;la&#160;manière&#160;dont&#160;VIVAQUA&#160;protège&#160;votre&#160;vie&#160;privée&#160;et&#160;traite&#160;vos&#160;données&#160;personnelles&#160;</i></p>
<p style="position:absolute;top:1214px;left:60px;white-space:nowrap" class="ft110"><i>dans&#160;la&#160;Charte&#160;de&#160;vie&#160;privée&#160;disponible&#160;sur&#160;www.vivaqua.be.En&#160;cas&#160;de&#160;demandes&#160;particulières&#160;liées&#160;à&#160;vos&#160;données&#160;à&#160;caractère&#160;personnel, vous&#160;pouvez&#160;</i></p>
<p style="position:absolute;top:1226px;left:60px;white-space:nowrap" class="ft110"><i>adresser vos questions par e-mail à privacy@vivaqua.be ou par courrier, à VIVAQUA, 17 - 19 Bd de l’Impératrice, 1000 Bruxelles</i></p>
<p style="position:absolute;top:1218px;left:855px;white-space:nowrap" class="ft111">1/1</p>
<p style="position:absolute;top:1236px;left:41px;white-space:nowrap" class="ft112"><i>RH 4941 A/F/WEB/2021</i></p>
</div>
</body>
</html>
`,
        `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
<head>
<title></title>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
 <br/>
<style type="text/css">
<!--
	p {margin: 0; padding: 0;}	.ft10{font-size:20px;font-family:Times;color:#ffac00;}
	.ft11{font-size:11px;font-family:Times;color:#575756;}
	.ft12{font-size:11px;font-family:Times;color:#575756;}
	.ft13{font-size:13px;font-family:Times;color:#00694e;}
	.ft14{font-size:14px;font-family:Times;color:#575756;}
	.ft15{font-size:11px;font-family:Times;color:#00694e;}
	.ft16{font-size:13px;font-family:Times;color:#575756;}
	.ft17{font-size:14px;font-family:Times;color:#575756;}
	.ft18{font-size:13px;font-family:Times;color:#ffffff;}
	.ft19{font-size:7px;font-family:Times;color:#00694e;}
	.ft110{font-size:8px;font-family:Times;color:#575756;}
	.ft111{font-size:9px;font-family:Times;color:#575756;}
	.ft112{font-size:8px;font-family:Times;color:#575756;-moz-transform: matrix(         0,         -1,          1,          0, 0, 0);-webkit-transform: matrix(         0,         -1,          1,          0, 0, 0);-o-transform: matrix(         0,         -1,          1,          0, 0, 0);-ms-transform: matrix(         0,         -1,          1,          0, 0, 0);-moz-transform-origin: left 75%;-webkit-transform-origin: left 75%;-o-transform-origin: left 75%;-ms-transform-origin: left 75%;}
-->
</style>
</head>
<body bgcolor="#A0A0A0" vlink="blue" link="blue">
<div id="page1-div" style="position:relative;width:892px;height:1262px;">
<p style="position:absolute;top:55px;left:261px;white-space:nowrap" class="ft10"><b>DÉMÉNAGEMENT&#160;/&#160;CHANGEMENT&#160;DE&#160;CLIENT</b></p>
<p style="position:absolute;top:84px;left:545px;white-space:nowrap" class="ft11">À renvoyer&#160;<b>par e-mail</b>&#160;à contact@vivaqua.be ou&#160;&#160;</p>
<p style="position:absolute;top:101px;left:413px;white-space:nowrap" class="ft12"><b>par courrier</b>&#160;à VIVAQUA –Bd de l’Impératrice 17-19 – 1000 Bruxelles.</p>
<p style="position:absolute;top:121px;left:60px;white-space:nowrap" class="ft13"><b>ADRESSE DE CONSOMMATION&#160;</b></p>
<p style="position:absolute;top:121px;left:833px;white-space:nowrap" class="ft13"><b>&#160;</b></p>
<p style="position:absolute;top:142px;left:60px;white-space:nowrap" class="ft14">Rue&#160;&#160;.............................................................................................................&#160;&#160;N°&#160;&#160;.......................&#160;&#160;Bte&#160;...............</p>
<p style="position:absolute;top:165px;left:60px;white-space:nowrap" class="ft14">N°&#160;appartement&#160;&#160;....................................................&#160;&#160;Étage&#160;.&#160;.....................&#160;&#160;&#160;&#160;Gauche &#160;&#160;&#160;Milieu &#160;&#160;&#160;&#160;Droite&#160;&#160;&#160;</p>
<p style="position:absolute;top:187px;left:60px;white-space:nowrap" class="ft14">Code postal&#160;............................&#160;Commune&#160;&#160;......................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:222px;left:60px;white-space:nowrap" class="ft13"><b>DONNÉES DU COMPTEUR</b></p>
<p style="position:absolute;top:239px;left:469px;white-space:nowrap" class="ft15"><b>N° DE COMPTEUR&#160; &#160; &#160; &#160;</b></p>
<p style="position:absolute;top:282px;left:469px;white-space:nowrap" class="ft15"><b>DATE DU RELEVÉ</b></p>
<p style="position:absolute;top:282px;left:69px;white-space:nowrap" class="ft15"><b>INDEX&#160;ACTUEL</b></p>
<p style="position:absolute;top:328px;left:60px;white-space:nowrap" class="ft13"><b>CLIENT SORTANT&#160;</b></p>
<p style="position:absolute;top:328px;left:656px;white-space:nowrap" class="ft13"><b>&#160;</b></p>
<p style="position:absolute;top:328px;left:661px;white-space:nowrap" class="ft16">LANGUE&#160;&#160;&#160;&#160;FR&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;NL</p>
<p style="position:absolute;top:349px;left:60px;white-space:nowrap" class="ft14">N° de client&#160;&#160;..............................................&#160;&#160;&#160;<b>Je suis &#160;&#160;&#160;propriétaire&#160; &#160; &#160; &#160;&#160;&#160;locataire&#160; &#160; &#160; &#160;&#160;&#160;mandataire&#160;</b></p>
<p style="position:absolute;top:371px;left:60px;white-space:nowrap" class="ft14">Nom(s) ou Nom de la société&#160;&#160;.......................................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:394px;left:60px;white-space:nowrap" class="ft14">Prénom(s)&#160;.......................................................................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:416px;left:60px;white-space:nowrap" class="ft14">Registre&#160;national&#160;&#160;...............................................................&#160;ou N° d’entreprise&#160;&#160;............................................</p>
<p style="position:absolute;top:439px;left:60px;white-space:nowrap" class="ft14">Téléphone&#160;&#160;.....................................................................................................................................................</p>
<p style="position:absolute;top:461px;left:60px;white-space:nowrap" class="ft14">N° de compte BE&#160;...........................................................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:463px;left:833px;white-space:nowrap" class="ft13"><b>&#160;</b></p>
<p style="position:absolute;top:484px;left:60px;white-space:nowrap" class="ft17"><b>Je souhaite que la facture de clôture soit envoyée</b></p>
<p style="position:absolute;top:506px;left:121px;white-space:nowrap" class="ft14">&#160;par e-mail&#160;&#160;........................................................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:529px;left:121px;white-space:nowrap" class="ft14">&#160;par&#160;courrier&#160;&#160;&#160;Rue&#160;&#160;&#160;.....................................................................................&#160;&#160;N°&#160;...............&#160;Bte&#160;...............</p>
<p style="position:absolute;top:551px;left:218px;white-space:nowrap" class="ft14">Code postal&#160;...............&#160;Commune&#160;....................................&#160;Pays&#160;...........................................</p>
<p style="position:absolute;top:601px;left:60px;white-space:nowrap" class="ft13"><b>PROPRIÉTAIRE OU MANDATAIRE (À COMPLÉTER EN CAS DE LOCATION)&#160;</b></p>
<p style="position:absolute;top:601px;left:598px;white-space:nowrap" class="ft18"><b>&#160;</b></p>
<p style="position:absolute;top:601px;left:661px;white-space:nowrap" class="ft16">LANGUE&#160;&#160;&#160;&#160;FR&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;NL</p>
<p style="position:absolute;top:622px;left:60px;white-space:nowrap" class="ft14">N° de client&#160;&#160;..............................................&#160;&#160;&#160;<b>Je suis &#160;&#160;&#160;propriétaire&#160; &#160; &#160; &#160;&#160;&#160;locataire&#160; &#160; &#160; &#160;&#160;&#160;mandataire&#160;</b></p>
<p style="position:absolute;top:644px;left:60px;white-space:nowrap" class="ft14">Nom(s) ou Nom de la société&#160;&#160;.......................................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:667px;left:60px;white-space:nowrap" class="ft14">Prénom(s)&#160;.......................................................................................................................................................</p>
<p style="position:absolute;top:689px;left:60px;white-space:nowrap" class="ft14">Téléphone&#160;.................................................&#160;E-mail&#160;&#160;.............................................................................................</p>
<p style="position:absolute;top:712px;left:60px;white-space:nowrap" class="ft14">N° de compte BE&#160;...........................................................................................................................................&#160;&#160;&#160;</p>
<p style="position:absolute;top:734px;left:60px;white-space:nowrap" class="ft14">Rue&#160;&#160;&#160;......................................................................................................................&#160;&#160;N°&#160;...............&#160;Bte&#160;...............&#160;</p>
<p style="position:absolute;top:757px;left:60px;white-space:nowrap" class="ft14">Code postal&#160;....................................&#160;Commune&#160;....................................&#160;Pays&#160;&#160;.....................................................</p>
<p style="position:absolute;top:806px;left:60px;white-space:nowrap" class="ft13"><b>NOUVEAU CLIENT</b></p>
<p style="position:absolute;top:806px;left:195px;white-space:nowrap" class="ft18"><b>&#160;</b></p>
<p style="position:absolute;top:806px;left:623px;white-space:nowrap" class="ft18"><b>........</b></p>
<p style="position:absolute;top:806px;left:661px;white-space:nowrap" class="ft16">LANGUE&#160;&#160;&#160;&#160;FR&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;NL</p>
<p style="position:absolute;top:827px;left:60px;white-space:nowrap" class="ft14">N° de client&#160;&#160;..............................................&#160;&#160;&#160;<b>Je suis &#160;&#160;&#160;propriétaire&#160; &#160; &#160; &#160;&#160;&#160;locataire&#160; &#160; &#160; &#160;&#160;&#160;mandataire&#160;</b></p>
<p style="position:absolute;top:850px;left:60px;white-space:nowrap" class="ft14">Nom(s) ou Nom de la société&#160;&#160;.......................................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:872px;left:60px;white-space:nowrap" class="ft14">Prénom(s)&#160;.......................................................................................................................................................</p>
<p style="position:absolute;top:895px;left:60px;white-space:nowrap" class="ft14">Registre&#160;national&#160;&#160;...............................................................&#160;ou N° d’entreprise&#160;&#160;............................................</p>
<p style="position:absolute;top:917px;left:60px;white-space:nowrap" class="ft14">Téléphone&#160;.................................................&#160;E-mail&#160;&#160;.............................................................................................</p>
<p style="position:absolute;top:940px;left:60px;white-space:nowrap" class="ft14">N° de compte BE&#160;...........................................................................................................................................&#160;&#160;</p>
<p style="position:absolute;top:962px;left:60px;white-space:nowrap" class="ft17"><b>Nombre de personnes domiciliées à l’adresse&#160;</b></p>
<p style="position:absolute;top:965px;left:396px;white-space:nowrap" class="ft11">(important pour estimer le montant de vos factures d’acompte)&#160;&#160;</p>
<p style="position:absolute;top:962px;left:749px;white-space:nowrap" class="ft14">&#160;.................</p>
<p style="position:absolute;top:985px;left:78px;white-space:nowrap" class="ft14">&#160;<b>Je souhaite domicilier mes factures</b>&#160;</p>
<p style="position:absolute;top:1007px;left:78px;white-space:nowrap" class="ft14">&#160;Je souhaite que mes factures soient envoyées à une autre adresse que l’adresse de consommation</p>
<p style="position:absolute;top:1030px;left:60px;white-space:nowrap" class="ft14">Rue&#160;&#160;&#160;......................................................................................................................&#160;&#160;N°&#160;...............&#160;Bte&#160;...............&#160;</p>
<p style="position:absolute;top:1052px;left:60px;white-space:nowrap" class="ft14">Code postal&#160;....................................&#160;Commune&#160;....................................&#160;Pays&#160;&#160;.....................................................</p>
<p style="position:absolute;top:1096px;left:71px;white-space:nowrap" class="ft13"><b>SIGNATURE&#160;CLIENT&#160;SORTANT</b></p>
<p style="position:absolute;top:1096px;left:348px;white-space:nowrap" class="ft13"><b>SIGNATURE&#160;PROPRIÉTAIRE</b></p>
<p style="position:absolute;top:1096px;left:600px;white-space:nowrap" class="ft13"><b>SIGNATURE NOUVEAU CLIENT</b></p>
<p style="position:absolute;top:1116px;left:598px;white-space:nowrap" class="ft19"><b>(OU DU PROPRIÉTAIRE SI PAS DE NOUVEAU CLIENT)</b></p>
<p style="position:absolute;top:1176px;left:60px;white-space:nowrap" class="ft110"><i>En signant ce formulaire les parties déclarent avoir&#160;pris connaissance et accepté les Conditions générales consultables sur www.vivaqua.be ou&#160;</i></p>
<p style="position:absolute;top:1188px;left:60px;white-space:nowrap" class="ft110"><i>envoyées&#160;sur&#160;simple&#160;demande.&#160;VIVAQUA&#160;accorde&#160;une&#160;grande&#160;importance&#160;à&#160;la&#160;protection&#160;des&#160;données&#160;à&#160;caractère&#160;personnel&#160;qu’elle&#160;est&#160;amenée&#160;à&#160;</i></p>
<p style="position:absolute;top:1201px;left:60px;white-space:nowrap" class="ft110"><i>traiter.&#160;Vous&#160;trouverez&#160;toutes&#160;les&#160;informations&#160;nécessaires&#160;sur&#160;la&#160;manière&#160;dont&#160;VIVAQUA&#160;protège&#160;votre&#160;vie&#160;privée&#160;et&#160;traite&#160;vos&#160;données&#160;personnelles&#160;</i></p>
<p style="position:absolute;top:1214px;left:60px;white-space:nowrap" class="ft110"><i>dans&#160;la&#160;Charte&#160;de&#160;vie&#160;privée&#160;disponible&#160;sur&#160;www.vivaqua.be.En&#160;cas&#160;de&#160;demandes&#160;particulières&#160;liées&#160;à&#160;vos&#160;données&#160;à&#160;caractère&#160;personnel, vous&#160;pouvez&#160;</i></p>
<p style="position:absolute;top:1226px;left:60px;white-space:nowrap" class="ft110"><i>adresser vos questions par e-mail à privacy@vivaqua.be ou par courrier, à VIVAQUA, 17 - 19 Bd de l’Impératrice, 1000 Bruxelles</i></p>
<p style="position:absolute;top:1218px;left:855px;white-space:nowrap" class="ft111">1/1</p>
<p style="position:absolute;top:1236px;left:41px;white-space:nowrap" class="ft112"><i>RH 4941 A/F/WEB/2021</i></p>
</div>
</body>
</html>
`,
    ]);

    onMounted(() => {
        // getClientSalesPdf()
    })

    async function getClientSalesPdf() {
        const data = await MakeOffer.getClientSalesPdf()
        console.log(data, 'pdf sales');
        
    }
</script>

<template>
    <div>
        <CompromisesSign :all-pages="html" />
    </div>
</template>
