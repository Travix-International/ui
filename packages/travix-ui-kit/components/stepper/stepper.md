Basic input:

    <div>
      <style dangerouslySetInnerHTML={{__html: `
        .ui-stepper .ui-stepper__button-decrease:before {
          content: '-';
        }
        .ui-stepper .ui-stepper__button-increase:before {
          content: '+';
        }
      `}} />
      <Stepper />
    </div>

Range 1 - 4 input:

    <div>
      <style dangerouslySetInnerHTML={{__html: `
        .ui-stepper .ui-stepper__button-decrease:before {
          content: '-';
        }
        .ui-stepper .ui-stepper__button-increase:before {
          content: '+';
        }
      `}} />
      <Stepper
        initValue={2}
        minValue={1}
        maxValue={4}
      />
    </div>