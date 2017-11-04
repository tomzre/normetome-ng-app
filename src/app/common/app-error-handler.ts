import { ErrorHandler, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Injectable()
export class AppErrorHandler implements ErrorHandler {
    toastr: ToastsManager;
   
   

    handleError(error: any): void {
        this.toastr.error('This is not good!', 'Oops!');
        console.log(error);
    }

}