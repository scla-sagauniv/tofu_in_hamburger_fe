import css from 'styled-jsx/css';

export const modalStyle = css.resolve`
  .backdrop {
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-y: hidden;
  }
  .modal {
    width: 60%;
    z-index: 10;
    margin: auto;
    padding: 3rem 2rem 2rem 2rem;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
  }
`;

export const neumorphismStyle = css.resolve`
  .neumophism{
    '--light-bg': '#E9B7B9',
    '--light-bg-dark-shadow': '#ba9294',
    '--light-bg-light-shadow': '#ffdcde',
    '--dark-bg': '#292E35',
    '--dark-bg-dark-shadow': '#21252a',
    '--dark-bg-light-shadow': '#313740',
    '--primary': '#8672FB',
    '--primary-dark': '#4526f9',
    '--primary-light': '#c7befd'
  }
`;
