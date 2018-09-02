import {fromEvent} from 'rxjs'
import {throttle, scan, map} from 'rxjs/operators'
import {interval} from 'rxjs'

const button = document.createElement('button');
button.appendChild(document.createTextNode('button'));
document.querySelector('#output').appendChild(button);
fromEvent(button, 'click')
    .pipe(
        throttle((e: any) => interval(1000)),
        map((e: any) => e.clientX),
        scan((count: number, clientX: number) => count + clientX, 0)
    )
    .subscribe((count) => console.log(`${count}`));
