allDescriptors.push(...[{"dependencies":["components","emulation"],"extensions":[{"className":"Screencast.ScreencastAppProvider","type":"@Common.AppProvider","order":1},{"className":"Screencast.ScreencastApp.ToolbarButtonProvider","type":"@UI.ToolbarItem.Provider","order":1,"location":"main-toolbar-left"},{"actionId":"components.request-app-banner","type":"context-menu-item","location":"mainMenu","order":10}],"name":"screencast","scripts":["screencast_module.js"]}]);applicationDescriptor.modules.push(...[{"type":"remote","name":"screencast"}]);