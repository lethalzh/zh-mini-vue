/**
 * Created  @date 2022/3/16 21:58
 * @author zh_elk
 */
import {reactive, effectWatch} from "./core/reactivity/index.ts";

let a = reactive({
    wq: 'sb',
})

let sq;
effectWatch(()=>{
    sq =  a.wq;
    console.log('>>>>>>>>>>>>>>>',sq)
})
a.wq='sbvwq'

