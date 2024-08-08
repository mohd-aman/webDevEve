import { render,screen,fireEvent } from "@testing-library/react";
import Counter from "../Components/Counter";

test('Initial State Check',()=>{
    render(<Counter/>);
    // check initally "Counter : 0" text is there or not
    const counterText = screen.getByText('Counter : 0');
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
    expect(counterText).toBeInTheDocument();
})

test("Increment By One",function(){
    render(<Counter/>);
    const incrementBtn = screen.getByText('+');
    fireEvent.click(incrementBtn);
    const counterText = screen.getByText('Counter : 1');  
    expect(counterText).toBeInTheDocument();
})

test("Decremental when state is 0",function(){
    render(<Counter/>);
    const decrementBtn = screen.getByText('-');
    fireEvent.click(decrementBtn);
    fireEvent.click(decrementBtn);
    const counterText = screen.getByText('Counter : 0');
    expect(counterText).toBeInTheDocument();
})

test("Decremental when state is not 0",function(){
    render(<Counter/>);
    const incrementBtn = screen.getByText('+');
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    const decrementBtn = screen.getByText('-');
    fireEvent.click(decrementBtn);
    const counterText = screen.getByText('Counter : 1');
    expect(counterText).toBeInTheDocument();
})