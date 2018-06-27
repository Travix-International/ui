Basic input:

    <div>
      <style dangerouslySetInnerHTML={{__html: `
        .ui-stepper .ui-stepper-button.ui-stepper-button_decrease:before {
          content: '-';
        }
        .ui-stepper .ui-stepper-button.ui-stepper-button_increase:before {
          content: '+';
        }
      `}} />
      <div>
        <Stepper />
      </div>
    </div>

Range 1 - 4 input:

    <div>
      <style dangerouslySetInnerHTML={{__html: `
        .ui-stepper .ui-stepper-button.ui-stepper-button_decrease:before {
          content: '-';
        }
        .ui-stepper .ui-stepper-button.ui-stepper-button_increase:before {
          content: '+';
        }
      `}} />
      <div>
        <Stepper
          initValue={2}
          minValue={1}
          maxValue={4}
        />
      </div>
    </div>