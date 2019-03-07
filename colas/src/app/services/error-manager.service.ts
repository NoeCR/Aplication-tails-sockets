import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class ErrorManagerService {

    public status: boolean;
    public message: string;

    constructor() {
        this.status = false;
        this.message = '';
    }

    setError(message: string) {
        this.status = true;
        this.message = message;
    }

    getError() {
        return this;
    }
    resetError() {
        this.status = false;
        this.message = '';
    }
}
