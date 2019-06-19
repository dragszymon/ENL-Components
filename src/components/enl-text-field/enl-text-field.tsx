import { Component, Element, h, State, Prop } from '@stencil/core';


@Component({
    tag: 'enl-text-field',
    styleUrl: 'style.css',
})



export class EnlTextField{

    // host element
    @Element() host : HTMLElement

    // input element
    @State() input : HTMLInputElement

    // placeholder which can be set by HTML attribute
    @Prop() placeholder : string

    // default value which can be set by HTML attribute
    @Prop() initValue : string

    // label which can be set by HTML attribute
    @Prop() label : string

    // value from input
    @State() inputValue : string

    // is it anything in input box?
    @State() inputValueExists = false

    // a text being showed in input box (it's initial value set by HTML attribute
    // or just written in input box by user)
    @State() value : string


    // adds active class to host element
    _addActiveClass(){

        if (!this.host.classList.contains('active')){
            this.host.classList.add('active')
        }

    }

    // removes active class from host element
    _removeActiveClass(){
        if (!this.value && this.host.classList.contains('active')){
            this.host.classList.remove('active');
        }
    }

    // updates value provided by user
    _updateInputValue(){
        this.inputValue = this.input.value;
        this._updateValue();
        if (this.inputValue.length != 0){
                this.inputValueExists = true;
        }else{
            this.inputValueExists = false;
        }
    }

    _updateValue(){
        this.value = this.inputValue;
        console.log(this.value)
    }


    connectedCallback(){
        if(this.initValue){
            this.value = this.initValue;
        }
    }


    componentDidLoad(){

        this.input = this.host.querySelector('input');
        this._updateInputValue();
        if(this.initValue){
            this._addActiveClass()
        };


    }

    render(){
        return[
            <div>

                <label htmlFor="enl-input"><slot /></label>
                <input
                    type="text" id="enl-input"
                    placeholder={this.placeholder}
                    value={this.value}
                    onInput={this._updateInputValue.bind(this)}
                    onFocus={this._addActiveClass.bind(this)}
                    onBlur={this._removeActiveClass.bind(this)}/>

            </div>

        ]
    }
}
