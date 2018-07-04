Basic checkbox:

    <div>
      <div>
        <Checkbox name="checkboxTest1" onChange={() => {alert('without text')}}/><br/><br/>
        <Checkbox name="checkboxTest2" checked onChange={() => {alert('checked')}}>checked</Checkbox><br/>
        <Checkbox name="checkboxTest3" disabled onChange={() => {alert('disabled')}}>disabled</Checkbox><br/>
        <Checkbox
          name="checkboxTest4"
          checked={state.value}
          onChange={() => {setState({value: !state.value})}}>
          can toggle
        </Checkbox><br/>
        <Checkbox checked dataAttrs={{'gtm-id': 'test-checkbox'}} name="checkboxTest5" onChange={() => {alert('checked')}}>
          with data attrs
        </Checkbox><br/>
      </div>
    </div>
