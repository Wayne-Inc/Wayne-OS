allDescriptors.push(...[{"dependencies":["profiler"],"extensions":[{"title":"Profiler","id":"js_profiler","className":"Profiler.JSProfilerPanel","location":"panel","type":"view","order":65}],"name":"js_profiler"},{"dependencies":["platform","ui","host","components"],"extensions":[{"className":"NodeMain.NodeMain","type":"early-initialization"},{"title":"Connection","tags":"node","id":"node-connection","className":"NodeMain.NodeConnectionsPanel","location":"panel","type":"view","order":0}],"name":"node_main"}]);applicationDescriptor.modules.push(...[{"name":"js_profiler"},{"type":"autostart","name":"node_main"}])
self['NodeMain']=self['NodeMain']||{};NodeMain.NodeConnectionsPanel=class extends UI.Panel{constructor(){super('node-connection');this.registerRequiredCSS('node_main/nodeConnectionsPanel.css');this.contentElement.classList.add('node-panel');const container=this.contentElement.createChild('div','node-panel-center');const image=container.createChild('img','node-panel-logo');image.src='https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png';InspectorFrontendHost.events.addEventListener(InspectorFrontendHostAPI.Events.DevicesDiscoveryConfigChanged,this._devicesDiscoveryConfigChanged,this);this._config;this.contentElement.tabIndex=0;this.setDefaultFocusedElement(this.contentElement);InspectorFrontendHost.setDevicesUpdatesEnabled(false);InspectorFrontendHost.setDevicesUpdatesEnabled(true);this._networkDiscoveryView=new NodeMain.NodeConnectionsView(config=>{this._config.networkDiscoveryConfig=config;InspectorFrontendHost.setDevicesDiscoveryConfig(this._config);});this._networkDiscoveryView.show(container);}
_devicesDiscoveryConfigChanged(event){this._config=(event.data);this._networkDiscoveryView.discoveryConfigChanged(this._config.networkDiscoveryConfig);}};NodeMain.NodeConnectionsView=class extends UI.VBox{constructor(callback){super();this._callback=callback;this.element.classList.add('network-discovery-view');const networkDiscoveryFooter=this.element.createChild('div','network-discovery-footer');networkDiscoveryFooter.createChild('span').textContent=Common.UIString('Specify network endpoint and DevTools will connect to it automatically. ');const link=networkDiscoveryFooter.createChild('span','link');link.textContent=Common.UIString('Learn more');link.addEventListener('click',()=>InspectorFrontendHost.openInNewTab('https://nodejs.org/en/docs/inspector/'));this._list=new UI.ListWidget(this);this._list.registerRequiredCSS('node_main/nodeConnectionsPanel.css');this._list.element.classList.add('network-discovery-list');const placeholder=createElementWithClass('div','network-discovery-list-empty');placeholder.textContent=Common.UIString('No connections specified');this._list.setEmptyPlaceholder(placeholder);this._list.show(this.element);this._editor=null;const addButton=UI.createTextButton(Common.UIString('Add connection'),this._addNetworkTargetButtonClicked.bind(this),'add-network-target-button',true);this.element.appendChild(addButton);this._networkDiscoveryConfig=[];this.element.classList.add('node-frontend');}
_update(){const config=this._networkDiscoveryConfig.map(item=>item.address);this._callback.call(null,config);}
_addNetworkTargetButtonClicked(){this._list.addNewItem(this._networkDiscoveryConfig.length,{address:'',port:''});}
discoveryConfigChanged(networkDiscoveryConfig){this._networkDiscoveryConfig=[];this._list.clear();for(const address of networkDiscoveryConfig){const item={address:address,port:''};this._networkDiscoveryConfig.push(item);this._list.appendItem(item,true);}}
renderItem(rule,editable){const element=createElementWithClass('div','network-discovery-list-item');element.createChild('div','network-discovery-value network-discovery-address').textContent=rule.address;return element;}
removeItemRequested(rule,index){this._networkDiscoveryConfig.splice(index,1);this._list.removeItem(index);this._update();}
commitEdit(rule,editor,isNew){rule.address=editor.control('address').value.trim();if(isNew)
this._networkDiscoveryConfig.push(rule);this._update();}
beginEdit(rule){const editor=this._createEditor();editor.control('address').value=rule.address;return editor;}
_createEditor(){if(this._editor)
return this._editor;const editor=new UI.ListWidget.Editor();this._editor=editor;const content=editor.contentElement();const fields=content.createChild('div','network-discovery-edit-row');const input=editor.createInput('address','text','Network address (e.g. localhost:9229)',addressValidator);fields.createChild('div','network-discovery-value network-discovery-address').appendChild(input);return editor;function addressValidator(rule,index,input){const match=input.value.trim().match(/^([a-zA-Z0-9\.\-_]+):(\d+)$/);if(!match)
return false;const port=parseInt(match[2],10);return port<=65535;}}};;NodeMain.NodeMain=class extends Common.Object{run(){Host.userMetrics.actionTaken(Host.UserMetrics.Action.ConnectToNodeJSFromFrontend);const target=SDK.targetManager.createTarget('main',Common.UIString('Main'),SDK.Target.Capability.Target,params=>new SDK.MainConnection(params),null);target.setInspectedURL('Node.js');InspectorFrontendHost.connectionReady();}};NodeMain.NodeChildTargetManager=class extends SDK.SDKModel{constructor(parentTarget){super(parentTarget);this._targetManager=parentTarget.targetManager();this._parentTarget=parentTarget;this._targetAgent=parentTarget.targetAgent();this._childConnections=new Map();parentTarget.registerTargetDispatcher(this);this._targetAgent.setDiscoverTargets(true);InspectorFrontendHost.setDevicesUpdatesEnabled(true);InspectorFrontendHost.events.addEventListener(InspectorFrontendHostAPI.Events.DevicesDiscoveryConfigChanged,this._devicesDiscoveryConfigChanged,this);}
_devicesDiscoveryConfigChanged(event){const config=(event.data);const locations=[];for(const address of config.networkDiscoveryConfig){const parts=address.split(':');const port=parseInt(parts[1],10);if(parts[0]&&port)
locations.push({host:parts[0],port:port});}
this._targetAgent.setRemoteLocations(locations);}
dispose(){InspectorFrontendHost.events.removeEventListener(InspectorFrontendHostAPI.Events.DevicesDiscoveryConfigChanged,this._devicesDiscoveryConfigChanged,this);for(const sessionId of this._childConnections.keys())
this.detachedFromTarget(sessionId,undefined);}
targetCreated(targetInfo){if(targetInfo.type==='node'&&!targetInfo.attached)
this._targetAgent.attachToTarget(targetInfo.targetId);}
targetInfoChanged(targetInfo){}
targetDestroyed(targetId){}
attachedToTarget(sessionId,targetInfo,waitingForDebugger){const target=this._targetManager.createTarget(targetInfo.targetId,Common.UIString('Node.js: %s',targetInfo.url),SDK.Target.Capability.JS,this._createChildConnection.bind(this,this._targetAgent,sessionId),this._parentTarget);target.runtimeAgent().runIfWaitingForDebugger();}
detachedFromTarget(sessionId,childTargetId){this._childConnections.get(sessionId).onDisconnect.call(null,'target terminated');this._childConnections.delete(sessionId);}
receivedMessageFromTarget(sessionId,message,childTargetId){const connection=this._childConnections.get(sessionId);if(connection)
connection.onMessage.call(null,message);}
_createChildConnection(agent,sessionId,params){const connection=new SDK.ChildConnection(agent,sessionId,params);this._childConnections.set(sessionId,connection);return connection;}};SDK.SDKModel.register(NodeMain.NodeChildTargetManager,SDK.Target.Capability.Target,true);;;Runtime.cachedResources["node_main/nodeConnectionsPanel.css"]="/*\n * Copyright (c) 2015 The Chromium Authors. All rights reserved.\n * Use of this source code is governed by a BSD-style license that can be\n * found in the LICENSE file.\n */\n\n.network-discovery-header {\n    display: flex;\n    align-items: center;\n    flex-direction: row;\n    margin-top: 5px;\n}\n\n.add-network-target-button {\n    margin: 10px 25px;\n    align-self: flex-start;\n}\n\n.network-discovery-list {\n    margin: 10px 0 0 25px;\n    max-width: 500px;\n    flex: none;\n}\n\n.network-discovery-list-empty {\n    flex: auto;\n    height: 30px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}\n\n.network-discovery-list-item {\n    padding: 3px 5px 3px 5px;\n    height: 30px;\n    display: flex;\n    align-items: center;\n    position: relative;\n    flex: auto 1 1;\n}\n\n.list-item .network-discovery-value {\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    -webkit-user-select: none;\n    color: #222;\n    overflow: hidden;\n}\n\n.network-discovery-value {\n    flex: 3 1 0;\n}\n\n.network-discovery-edit-row {\n    flex: none;\n    display: flex;\n    flex-direction: row;\n    margin: 6px 5px;\n    align-items: center;\n}\n\n.network-discovery-edit-row input {\n    width: 100%;\n    text-align: inherit;\n}\n\n.network-discovery-footer {\n    overflow: hidden;\n    margin: 15px 0 0 25px;\n    max-width: 500px;\n}\n\n.network-discovery-footer > * {\n    white-space: pre-wrap;\n}\n\n.network-discovery-header {\n    display: none;\n}\n\n.node-panel {\n    align-items: center;\n    justify-content: flex-start;\n}\n\n.network-discovery-view {\n    min-width: 400px;\n    flex: auto;\n}\n\n.add-network-target-button {\n    align-self: center;\n}\n\n:host-context(.node-frontend) .network-discovery-list-empty {\n    height: 40px;\n}\n\n:host-context(.node-frontend) .network-discovery-list-item {\n    padding: 3px 15px;\n    height: 40px;\n}\n\n.network-discovery-list {\n    margin: 20px 0 5px 0;\n    max-width: 600px;\n    max-height: 202px;\n}\n\n.network-discovery-footer {\n    margin: 0;\n}\n\n.node-panel-center {\n    display: flex;\n    align-items: stretch;\n    justify-content: center;\n    max-width: 600px;\n    flex-direction: column;\n    padding-top: 50px;\n}\n\n.node-panel-logo {\n    align-self: center;\n    width: 400px;\n    margin-bottom: 50px;\n    flex: none;\n}\n\n:host-context(.node-frontend) .network-discovery-edit-row input {\n    height: 30px;\n    padding-left: 5px;\n}\n\n:host-context(.node-frontend) .network-discovery-edit-row {\n    margin: 6px 9px;\n}\n\n/*# sourceURL=node_main/nodeConnectionsPanel.css */";