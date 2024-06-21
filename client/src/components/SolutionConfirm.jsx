export default function SolutionConfirm({ onConfirm }) {
  return (
    <div id="solution-correct">
      <h2>Great job!</h2>
      <span className='emoji' role="img">😊</span>
      <p>You've absolutely nailed it!</p>
      <div id="confirmation-actions">
        <button onClick={onConfirm}>
          OK
        </button>
      </div>
    </div>
  );
}
