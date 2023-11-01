const coef = 0.3 //seconds

const WAIT = async () =>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{ resolve() }, 1000*coef);
    })
}
export default WAIT