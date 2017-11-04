import { ErrorHandler, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Injectable()
export class AppErrorHandler implements ErrorHandler {
    
   
   

    handleError(error: any): void {
        
        console.log(error);
    }

}