function DropdownMenu({
  value, onChange, options = []
}) {
  return (
    <select
      value={value}
      onChange={onChange}
    >
      {options.map((o, i) => (
        <option
          key={`options-${i}`}
          label={o.label || ''}
          value={o.value}
        />
      ))}
    </select>
  );
}

export default DropdownMenu;
