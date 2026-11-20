const forceSlider=document.getElementById('force');
const massSlider=document.getElementById('mass');
const cart=document.getElementById('cart');
const arrow=document.getElementById('arrow');
const statusText=document.getElementById('status');
let running=false;
function updateValues(){
  const force=Number(forceSlider.value), mass=Number(massSlider.value);
  const a=force/mass;
  document.getElementById('forceValue').textContent=force;
  document.getElementById('massValue').textContent=mass;
  document.getElementById('acceleration').textContent=a.toFixed(2)+' m/s²';
  document.getElementById('netForce').textContent=force+' N';
  arrow.style.fontSize=(14+force/3)+'px';
  arrow.style.left='10%';
  if(!running)statusText.textContent='Ready to experiment';
}
forceSlider.addEventListener('input',updateValues);
massSlider.addEventListener('input',updateValues);
document.getElementById('run').addEventListener('click',()=>{
  if(running)return;
  running=true;
  cart.style.transition='left '+Math.max(1,4-(Number(forceSlider.value)/10))+'s linear';
  cart.style.left='72%';
  arrow.style.left='72%';
  statusText.textContent='The cart accelerates as force acts on it!';
  setTimeout(()=>{running=false;statusText.textContent='Experiment complete. Change the sliders and run again.';},4200);
});
document.getElementById('reset').addEventListener('click',()=>{
  running=false;cart.style.transition='left .4s ease';cart.style.left='8%';arrow.style.left='10%';
  forceSlider.value=10;massSlider.value=2;updateValues();statusText.textContent='Reset. Ready to experiment.';
});
document.getElementById('checkQuiz').addEventListener('click',()=>{
  const answers={q1:'a',q2:'b',q3:'c'};let score=0,answered=0;
  Object.entries(answers).forEach(([q,a])=>{const choice=document.querySelector(`input[name="${q}"]:checked`);if(choice){answered++;if(choice.value===a)score++;}});
  const result=document.getElementById('quizResult');
  if(answered<3){result.textContent='Please answer all 3 questions before checking.';return;}
  result.textContent=`You scored ${score}/3. ${score===3?'Excellent work!':score===2?'Good job—review one law and try again.':'Review the laws above and give it another try!'}`;
});
updateValues();