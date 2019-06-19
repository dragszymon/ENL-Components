import { Component, Element, h, State } from '@stencil/core';


@Component({
    tag: 'enl-text-field',
    styleUrl: 'style.css',
})



export class EnlTextField{

    @Element() host : HTMLElement

    @State() label : HTMLElement

    _addActiveClass(){
        if (!this.label.classList.contains('active')){
            this.label.classList.add('active')
        }
        // console.log(this.label)
    }

    componentDidRender(){
        this.label = this.host.querySelector('label');
        console.log(this.label)
    }

    render(){
        return[
            <div>

                <label htmlFor="enl-input">Label</label>
                <input type="text" id="enl-input" onClick={this._addActiveClass.bind(this)}/>

            </div>

        ]
    }
}
