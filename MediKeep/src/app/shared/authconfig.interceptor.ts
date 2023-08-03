import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { NgxSpinnerService } from "ngx-spinner";
import { finalize } from "rxjs";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private spinner: NgxSpinnerService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.spinner.show();
        const authToken = this.authService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req).pipe(
            finalize(()=>{
                setTimeout(() => {
                    this.spinner.hide();
                }, 2000);
            })
        );
    }
}