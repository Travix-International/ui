Basic input:

    <div style={{ background: '#D5E8F8', padding: '10px' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .ui-stepper .ui-stepper-button.ui-stepper-button_decrease:before {
          content: '-';
        }
        .ui-stepper .ui-stepper-button.ui-stepper-button_increase:before {
          content: '+';
        }
      `}} />
      <div style={{ width: '50%' }}>
        <Stepper />
      </div>
    </div>

Range 1 - 4 input:

    <div style={{ background: '#D5E8F8', padding: '10px' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .ui-stepper .ui-stepper-button.ui-stepper-button_decrease:before {
          content: '-';
        }
        .ui-stepper .ui-stepper-button.ui-stepper-button_increase:before {
          content: '+';
        }
      `}} />
      <div style={{ width: '50%' }}>
        <Stepper
          initValue={1}
          minValue={1}
          maxValue={4}
        />
      </div>
    </div>