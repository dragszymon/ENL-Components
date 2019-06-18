import { Component, Prop, Method, Event, EventEmitter, h } from '@stencil/core';

@Component({
    tag: 'enl-side-drawer',
    styleUrl: 'style.css',
})
export class EnlSideDrawer {
    @Prop({ reflectToAttr: true, mutable: true }) opened: boolean;

    @Event({ bubbles: false }) onOpen: EventEmitter;
    @Event({ bubbles: false }) onClose: EventEmitter;
    @Event({ bubbles: false }) onToggle: EventEmitter<boolean>;

    @Method() async open() {
        this._open()
    }
    @Method() async close() {
        this._close()
    }

    _open(){
        this.opened = true;
        this.onOpen.emit()
        this.onToggle.emit(true)
    }

    _close(){
        this.opened = false;
        this.onClose.emit()
        this.onToggle.emit(false)
    }

    render(){
        return [
            <div class="enl-side-drawer__drawer">
                <div class="header">
                    <slot name="header" />
                </div>
                <div class="content">
                    <slot name="content" />
                </div>
            </div>,

            <div
                onClick={this._close.bind(this)}
                class="enl-side-drawer__backdrop">
            </div>
        ]
    }
}