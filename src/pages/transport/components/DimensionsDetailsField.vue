<div class="send-receive-form__input-wrapper__dimension-details">
    <div class="dimension-details__switcher">
        <div class="switcher__on-mobile">
            <Switch checked-name="Oui" unchecked-name="Non"
                item-label="Je ne connais pas les dimension de l’objet"
                @switch-value="handleDimensionOptions" />
        </div>
        <div class="switcher__on-desktop">
            <RadioGroup :options="RadioOptions" @select-option="handleDimensionOptions" />
        </div>
    </div>
    <Transition>
        <div v-if="displayDimensionFields" class="dimension-details">
            <div class="dimension-details__input-group">
                <div v-for="(e, idx) in DimensionInputGroup" :key="idx"
                    class="dimension-details__input-element">
                    <component :is="e.component" :label="e.label" :nameInput="e.nameInput"
                        :required="e.required" :disabled="e.disabled" @handle-change="handleChange" />
                </div>
            </div>
        </div>
        <div v-else>
            <RadioGroupButton :options="PredifinedSize" />
        </div>
    </Transition>
    <Select class="dimension-details__select  w-full" :label="'Poids'" :name="''" />
</div>