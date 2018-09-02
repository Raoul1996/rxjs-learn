import {Observable, Subject, ReplaySubject, from, of, range} from 'rxjs'
import {map, filter, switchMap} from 'rxjs/operators'

range(1, 200)
    .pipe(filter(x => x % 2 === 1), map(x => x + x))
    .subscribe(x => console.log(x));

const observable = Observable.create((observer: any) => {
    observer.next('Hey guys!');
    observer.next('How are you?');
    observer.complete();
    observer.next('This will not send.')

});
observable.subscribe((x: any) => addItem(x))

function addItem(val: any) {
    const node = document.createElement("li");
    const textNode = document.createTextNode(val);
    node.appendChild(textNode);
    document.getElementById('output').appendChild(node);
}