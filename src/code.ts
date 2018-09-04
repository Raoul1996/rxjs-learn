import {Observable} from 'rxjs'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/map'

const URL = 'https://api.raoul1996.cn/login';
const stream$ = Observable.create((observer: any) => {
    let request = fetch(URL, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': "application/json"
        }),
    })
        .then((res: any) => res.json())
        .then((response: string) => {
            observer.next(response);
            observer.complete();
        }).catch((err: any) => {
            observer.error(err);
        })
});
const subscription = stream$.subscribe(
    (data: string) => console.log(data),
    (err: any) => console.log(`Error:${err}`),
    () => console.log(`Complete: no args`));

console.clear();

export interface IWindow extends Window {
    webkitSpeechRecognition: any;
}

const {webkitSpeechRecognition}: IWindow = <IWindow>window;
const speechRecognition$ = new Observable((observable: any) => {
    const recognition = new webkitSpeechRecognition();
    recognition.onresult = (event: any) => {
        observable.next(event);
        observable.complete();
    };
    recognition.start();
    return () => {
        recognition.stop();
    }
});

const say = (text: string) => new Observable((observer: any) => {
    const utterance = new SpeechSynthesisUtterance();
    utterance.onend = ((e: any) => {
        observer.next(e);
        observer.complete();
    });
    speechSynthesis.speak(utterance);
});

const button = document.createElement('button');
button.appendChild(document.createTextNode('voice'));
document.querySelector('#output').appendChild(button);

const heyClick$ = Observable.fromEvent(button, 'click');

heyClick$
    .switchMap((e: any) => speechRecognition$)
    .map((e: any) => e.results[0][0].transcript)
    .map((text: string) => {
        console.log(text);
        return text;
    })
    .concatMap(say)
    .subscribe((e: any) => console.log(e));
