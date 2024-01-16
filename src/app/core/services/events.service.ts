import { Injectable } from '@angular/core';
import { Observable, Subject, filter } from 'rxjs';

interface IEvent<T = any> {
    name: string;
    data: T;
}

@Injectable({
    providedIn: 'root'
})
export class EventsService {

    private event$: Subject<IEvent> = new Subject<IEvent>();

    constructor() { }

    public eventsFiltered<T = any>(nameEvents: string[]): Observable<IEvent<T>> {
        return this.event$.asObservable().pipe(filter(event => nameEvents.some((name) => name == event.name)));
    }

    get getEventObservable(): Observable<IEvent> {
        return this.event$.asObservable();
    }

    public emitEvent<T = any>(nameEvent: string, data: T): void {
        return this.event$.next({ name: nameEvent, data });
    }
}
