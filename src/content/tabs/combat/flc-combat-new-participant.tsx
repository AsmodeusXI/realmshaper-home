import * as React from 'react';
import { ResInput } from '../../../components/resinput';

interface NewParticipantProps {
  id: number;
  update: Function;
}

export interface NewParticipantState { id: number;
  name: string;
  level: number;
}

export class NewParticipant extends React.Component<NewParticipantProps, NewParticipantState> {
  private newParticipantInput: HTMLInputElement;

  constructor(props: NewParticipantProps) {
    super(props);
    this.state = {
      id: this.props.id,
      name: '',
      level: 1
    };

		this.setNewParticipantInput = this.setNewParticipantInput.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeLevel = this.changeLevel.bind(this);
  }

	setNewParticipantInput(inputRef: HTMLInputElement) {
		this.newParticipantInput = inputRef;
	}

  componentDidMount(): void {
    this.newParticipantInput.focus();
  }

  changeName(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState(
			{ name: event.target.value },
			() => this.props.update(this.state)
		);
  }

  changeLevel(event: React.ChangeEvent<HTMLInputElement>): void {
    let newLevel = parseInt(event.target.value);
    if (newLevel < 1) newLevel = 1;
    if (newLevel > 20) newLevel = 20;
    this.setState(
			{ level: newLevel },
			() => this.props.update(this.state)
		);
  }

  render(): JSX.Element {
    return (
      <section className="new-participant">
        <div className="participant-field">
          <div className='participant-label'>Name:</div>
          <ResInput
            reference={this.setNewParticipantInput}
            name="new-name"
            className='participant-input'
            value={this.state.name}
            update={this.changeName} />
        </div>
        <div className="participant-field">
          <div className='participant-label'>Level:</div>
          <ResInput
            type="number"
            name="new-level"
            className='participant-input'
            value={this.state.level}
            update={this.changeLevel} />
        </div>
      </section>
    );
  }
}
