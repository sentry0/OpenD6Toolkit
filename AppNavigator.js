import React, { Component }  from 'react';
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import HomeScreen from './src/components/screens/HomeScreen';
import DieRollerScreen from './src/components/screens/DieRollerScreen';
import TemplateSelectScreen from './src/components/screens/TemplateSelectScreen';
import TemplateDeleteScreen from './src/components/screens/TemplateDeleteScreen';
import NewTemplateScreen from './src/components/screens/NewTemplateScreen';
import OpenTemplateScreen from './src/components/screens/OpenTemplateScreen';
import ArchitectScreen from './src/components/screens/ArchitectScreen';
import EditAttributeScreen from './src/components/screens/EditAttributeScreen';
import EditSkillScreen from './src/components/screens/EditSkillScreen';
import EditOptionScreen from './src/components/screens/EditOptionScreen';
import BuilderScreen from './src/components/screens/BuilderScreen';
import SpecializationScreen from './src/components/screens/SpecializationScreen';
import LoadCharacterScreen from './src/components/screens/LoadCharacterScreen';
import CharacterOptionsScreen from './src/components/screens/CharacterOptionsScreen';
import MassRollerScreen from './src/components/screens/MassRollerScreen';
import CombatTrackerScreen from './src/components/screens/CombatTrackerScreen';
import BackupAndRestoreScreen from './src/components/screens/BackupAndRestoreScreen';
import StatisticsScreen from './src/components/screens/StatisticsScreen';
import OglScreen from './src/components/screens/OglScreen';
import Sidebar from './src/components/Sidebar';

const AppNavigator = createDrawerNavigator({
    Home: HomeScreen,
    DieRoller: DieRollerScreen,
    TemplateSelect: TemplateSelectScreen,
    NewTemplate: NewTemplateScreen,
    OpenTemplate: OpenTemplateScreen,
    Architect: ArchitectScreen,
    EditAttribute: EditAttributeScreen,
    EditSkill: EditSkillScreen,
    EditOption: EditOptionScreen,
    Builder: BuilderScreen,
    Specialization: SpecializationScreen,
    LoadCharacter: LoadCharacterScreen,
    Options: CharacterOptionsScreen,
    TemplateDelete: TemplateDeleteScreen,
    MassRoller: MassRollerScreen,
    CombatTracker: CombatTrackerScreen,
    BackupAndRestore: BackupAndRestoreScreen,
    Statistics: StatisticsScreen,
    Ogl: OglScreen,
}, {
    initialRouteName: 'Home',
    drawerPosition: 'right',
    gesturesEnabled: true,
    contentComponent: Sidebar
});

export default createAppContainer(AppNavigator);