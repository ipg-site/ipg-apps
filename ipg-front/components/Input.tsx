import React from 'react';
import classes from '../styles/Input.module.scss';

export const InputBox: React.FC<{label: string, onChange?: ((event: {input: unknown}) => void), onKeyPressed?: () => void, secure?: boolean;defaultValue?: string} > = ({label, onChange, onKeyPressed, secure, defaultValue}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  return (
    <div className={classes.root}>
      <label onClick={() => {
        if (ref !== null) {
          ref.current.focus();
        }
      }} className={classes.inputLabel}>{label}</label>
      <input ref={ref} type={secure ? 'password' : 'text'} className={classes.inputBox} defaultValue={defaultValue || ''} onChange={async (e) => {
        if (!onChange) return;
        onChange({
          input: e.target.value,
        });
      }} onKeyDown={(e) => {
        if (!onKeyPressed) return;
        if (e.code === 'Enter') {
          onKeyPressed();
        }
      }}/>
    </div>
  );
};

export const Button: React.FC<{onAction?: () => void, variable?: 'error' | 'primary' | 'verify'}> = ({onAction, children, variable}) => {
  return (
    <button className={classes['button-' + (variable || 'primary')]} onClick={() => {
      if (!onAction) return;
      onAction();
    }} onKeyDown={(e) => {
      if (!onAction) return;
      if (e.code === 'Enter') {
        onAction();
      }
    }}>{children}</button>
  );
}
;

export const SelectBox: React.FC<{onAction: (event: {
  index: number;
  value: string;
}) => void, label: string, items: string[], index: number}> = ({onAction, label, items, index: i}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [index, setIndex] = React.useState(i);

  React.useEffect(() => {
    setIndex(i);
  }, [i]);

  return (
    <div className={classes.root}>
      <label onClick={() => {
        if (ref !== null) {
          ref.current.focus();
        }
      }} className={classes.inputLabel}>{label}</label>
      <select className={classes.select} value={index} onChange={(e) => {
        const index = Number(e.target.value);
        setIndex(index);
        if (onAction) {
          onAction({
            index: index,
            value: items[index],
          });
        }
      }}>
        {
          items.map((item, i) => (
            <option key={label + '-' + i} value={i}>{item}</option>
          ))
        }
      </select>
    </div>
  );
}
;
