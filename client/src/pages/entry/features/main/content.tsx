import React from 'react';
import Note from './notes';
import {
  Switch,
  Route
} from "react-router-dom";

export default function SwitchComponent() {
  return (
    <Switch>
      <Route path="/:id" children={<Note />} />
    </Switch>
  )
}