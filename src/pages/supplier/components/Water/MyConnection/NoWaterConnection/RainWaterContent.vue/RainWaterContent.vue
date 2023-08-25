<template>
    <div class="content">
        <div class="content__items">
            <Title
                type="h2"
                weight="600"
                label="Regenwaterput bijna leeg!?"
                class="supplier-work__head-title"
            />
            <div class="content__item">
                <Paragraphe>
                    Als de regenwaterput dreigt leeg te komen in periode van
                    langdurige droogte kan water vanuit het drinkwaternet worden
                    toegevoegd. Bijvullen of omschakelen in geval van droogte
                    kan via één van de onderstaande systemen. Belangrijk bij
                    deze systemen is het respecteren van de algemene voorwaarden
                    waaraan de installatie moet voldoen. Tip: de regenwaterput
                    gedeeltelijk vullen is meestal al voldoende om een droge
                    periode te overbruggen.
                </Paragraphe>
                <img src="@/assets/vasteverbinding.jpg" alt="" />
            </div>
        </div>
        <hr class="__hr" />
        <div class="content__items">
            <div>
                <Title
                    type="h4"
                    weight="500"
                    label="1. Bijvulling van de regenwaterput"
                    class="content__list"
                />
                <Paragraphe>
                    Controleer regelmatig het peil van het regenwater. In droge
                    periodes kan men bij lage regenwaterstand regelmatig een
                    hoeveelheid drinkwater op een gecontroleerde wijze
                    bijvullen. Volg tijdens het bijvullen van de regenwaterput
                    het niveau goed op (bv. door een keukenwekker of het alarm
                    op je telefoon in te stellen, zodat zeker geen drinkwater
                    verloren gaat). Belangrijk is om een onderbreking van
                    minimaal 2 centimeter te respecteren tussen de voeding en de
                    bijvulleiding naar de put. Op deze manier kan eventuele
                    waterverspilling worden opgemerkt.
                </Paragraphe>
                <div class="link">
                    <RoundLink /><a
                        href="https://www.dewatergroep.be/-/media/de-watergroep/drinkwater/bijvulling-regenwaterput.png?la=nl-be"
                        >Bekijk hier hoe je best je regenwaterput kan
                        bijvullen
                    </a>
                </div>
                <img
                    src="@/assets/Reglementaire_bijvulling_tweedecircuitwaterreservoir.jpg"
                    alt=""
                />
            </div>
            <hr class="__hr" />
            <div>
                <Title
                    type="h4"
                    weight="500"
                    label="2. Omschakeling van de aanzuigleiding"
                    class="content__list"
                />
                <Paragraphe>
                    In dit geval moet de verbruiker zelf het niveau van de
                    hemelwaterput in het oog houden. Als het niveau te laag
                    komt, kan hij omschakelen naar de buffertank, gevoed met
                    drinkwater door de bediening van een aantal afsluiters.
                    Dergelijk systeem kan eveneens geautomatiseerd worden in
                    functie van het peil van de regenwaterput. Het is belangrijk
                    erop toe te zien dat geen drinkwater ongemerkt kan
                    terugvloeien naar de hemelwaterput. De automatische
                    bijvulsystemen dienen Belgaqua gekeurd te zijn. Het is
                    aangewezen de afvoer van het automatisch bijvulsysteem
                    eveneens te onderbreken ten opzichte van de riolering, zodat
                    lekverliezen kunnen voorkomen worden.
                </Paragraphe>
                <div class="link">
                    <RoundLink /><a
                        href="https://www.dewatergroep.be/-/media/de-watergroep/drinkwater/omschakeling-aanzuigleiding.png?la=nl-be"
                        >Bekijk hier hoe je best de aanzuigleiding kan
                        omschakelen
                    </a>
                </div>
            </div>
            <hr class="__hr" />
            <div>
                <Title
                    type="h4"
                    weight="500"
                    label="3. Omschakeling door middel van een dubbel leidingennet naar de tappunten (off/off)"
                    class="content__list"
                />
                <Paragraphe>
                    In dit geval moet de verbruiker zelf het niveau van de
                    hemelwaterput in het oog houden. Als het niveau te laag
                    komt, kan hij omschakelen naar de buffertank, gevoed met
                    drinkwater door de bediening van een aantal afsluiters.
                    Dergelijk systeem kan eveneens geautomatiseerd worden in
                    functie van het peil van de regenwaterput. Het is belangrijk
                    erop toe te zien dat geen drinkwater ongemerkt kan
                    terugvloeien naar de hemelwaterput. De automatische
                    bijvulsystemen dienen Belgaqua gekeurd te zijn. Het is
                    aangewezen de afvoer van het automatisch bijvulsysteem
                    eveneens te onderbreken ten opzichte van de riolering, zodat
                    lekverliezen kunnen voorkomen worden.
                </Paragraphe>
                <div class="link">
                    <RoundLink /><a
                        href="link https://www.dewatergroep.be/-/media/de-watergroep/drinkwater/omschakeling-dubbel-leidingennet.png?la=nl-be"
                        >Bekijk hier hoe je best een dubbel leidingennet kan
                        omschakelen.
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
import RoundLink from '@/components/Icon/RoundLink.vue';
</script>
<style lang="scss" scoped>
    .__hr {
        @apply text-gray w-full;
    }
    .content {
        @apply flex flex-col gap-[18px] rounded-[4px] p-[10px];
        &__list{
            color: var(--color-gray-icon);
        }
        &__item{
            @apply flex gap-[18px] p-[10px] rounded-[8px] flex-wrap;
            background-color: var(--color-gray);
        }
        &__items{
            @apply flex flex-col gap-[18px];
        }
    }
    .link {
        @apply flex gap-[18px] items-center;
        a {
            color: var(--color-primary);
        }
    }
</style>
