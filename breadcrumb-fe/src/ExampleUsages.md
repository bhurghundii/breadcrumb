      <HeaderText defaultText={"This is Drawl"} />
      <BodyText defaultText={"Drawl is a Notion-esque Diary"} />
      <BodyText
        defaultText={
          "You get one big piece of paper per day for all your notes"
        }
      />
      <BodyText defaultText={"/ gives you widgets"} />
      <BodyText defaultText={"# connects your notes"} />
      <BodyText
        defaultText={"Give it a shot - edit the page right here and now!"}
      />

      <div className="p-4">
        <Checkbox
          label="Check me!"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <p className="mt-4">
          Checkbox state: <strong>{isChecked ? "Checked" : "Unchecked"}</strong>
        </p>

      </div>



  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

    const [isChecked, setIsChecked] = useState(false);
