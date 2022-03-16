/**
 * Created  @date 2022/3/16 22:00
 * @author zh_elk
 */
let currentEffect;

class Dep {
    constructor(val) {
        this.effects = new Set();
        this._val = val;
    }
    get value(){
        console.log('get>dep')
        this.depend();
        return this._val;
    }
    set value(newVal) {
        console.log('set>dep')
        this._val = newVal;
        this.notice();
    }
    depend() {
        if(currentEffect) {
            this.effects.add(currentEffect);
        }
    }
    notice() {
        this.effects.forEach(effect=>{
            effect();
        })
    }
}
function effectWatch(effect) {
    currentEffect = effect;
    effect();
    currentEffect = null;
}

let b = 0;
const dep = new Dep(13);
effectWatch(()=>{
    b = dep.value+10;
    console.log(b,'>>2', dep)
})
dep.value = 20;


function getDep(target, key){
    let depsMap = targetMap.get(target);
    if(!depsMap) {
        depsMap = new Map();
        targetMap.set(target, depsMap);
    }
    console.log(depsMap)
    let dep = depsMap.get(key);
    if(!dep) {
        dep = new Dep();
        targetMap.set(target, dep);
    }
    return dep;
}


let targetMap = new Map();

function  reactive(raw) {
    return new Proxy(raw, {
        get(target, key) {
            const dep = getDep(target, key);
            dep.depend();
            // target[key];
            return Reflect.get(target, key);
        },
        set(target, key, value) {
            const dep = getDep(target, key);
            const result = Reflect.set(target, key ,value);
            dep.notice();
            return result;
        }
    })
}

const my = reactive({
    age: 18,
})
let wq = 0;
effectWatch(()=>{
    wq =  my.age;
    console.log('>>>>>>>>>>>>>>>',wq)
})

 my.age = 20;
