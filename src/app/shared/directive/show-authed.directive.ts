/**
 * Created by yitala on 2016/12/6.
 */

import {Directive, OnInit, TemplateRef, ViewContainerRef, Input} from "@angular/core";
import {UserService} from "../../core/user.service";

@Directive({selector:'[showAuthed]'})
export class ShowAuthedDirective implements OnInit{

    condition:boolean;

    constructor(
        private templateRef:TemplateRef<any>,
        private userService:UserService,
        private viewContainer:ViewContainerRef
    ){}

    ngOnInit(): void {
        console.log("初始化指令");
        this.userService.isAuthenticated.subscribe(
            (isAuthenticated) => {
              console.log(isAuthenticated);
              console.log(this.condition);
                if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
                    this.viewContainer.createEmbeddedView(this.templateRef);
                } else {
                    this.viewContainer.clear();
                }
            }
        )
    }

    @Input() set showAuthed(condition:boolean){
        this.condition = condition;
    }
}
