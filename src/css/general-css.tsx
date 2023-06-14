import css from 'styled-jsx/css';

export const modalStyle = css.resolve`
  .backdrop {
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: hidden;
  }
  .modal {
    width: clamp(50%, 700px, 90%);
    height: min(50%, 300px);
    z-index: 10;
    margin: auto;
    padding: 0 2rem;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
  }
`;
