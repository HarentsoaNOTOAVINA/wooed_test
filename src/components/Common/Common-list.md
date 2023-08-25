# **COMMON LIST**

## 1. Button:         
props {
  type?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  width?: string;
}

## 2. ButtonMenu:
props {
  isIcon?: string;
  width?: string;
}

## 3. Input:
props {
  label,
  placeholder,
  model,
  nameInput,
}

 
props {
  is,
  type
}

## 5. Select:
props {
 options: Array<object>;
  name: string;
  placeholder?: string;
}

## 5. Title:
props {
 type,
 label,
 weight
}

## 6. Switch:
props{
  checkedName : string,
  uncheckedName : string
}

event {
  switchValue : {
    params : value
  }
}

## 7. Input Date:
event : {
  handleChange
}
## 8. Radio:
props {
    radioDefaultCheck: String,
    disabled: Boolean,
    element: Array <any>,
    name: String,
    align: String,
    classLabelRadio: String,
    defaultClass: String,
}

## 9. Signature electronic:
props{
    hasTitle: Boolean,
    title: String,
    sizePen: Number,
    width: String,
    height: String,
}

## 10. Textarea:
props{
  label : string,
  nameInput : string,
  maxLength ?: number,
  showCount ?: boolean,
  required ?: boolean 
}

## 11. Select avec autoCompletion
props{
    name: any;
    options: Array<SelectProps>;
    placeholder?: string;
    style?: string;
    hasSubTitle?: boolean;
    subTitle?: string;
}

event{
  onChange
}
