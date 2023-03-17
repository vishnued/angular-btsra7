import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';

import { NodeEditor, Engine } from 'rete';
import ConnectionPlugin from 'rete-connection-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import MinimapPlugin from 'rete-minimap-plugin';
import { NumComponent } from './components/number-component';
import { AddComponent } from './components/add-component';
import { AngularRenderPlugin } from 'rete-angular-render-plugin';
import { zoomAt } from 'rete-area-plugin';

@Component({
  selector: 'app-twin',
  templateUrl: './twin.component.html',
  styleUrls: ['./twin.component.css'],
})
export class TwinComponent implements AfterViewInit {
  constructor() {}

  @ViewChild('nodeEditor') el: ElementRef;
  editor = null;

  async ngAfterViewInit() {
    const container = this.el.nativeElement;

    const components = [new NumComponent(), new AddComponent()];

    const editor = new NodeEditor('demo@0.2.0', container);
    editor.use(ConnectionPlugin);
    console.log('AngularRenderPlugin', AngularRenderPlugin);
    editor.use(AngularRenderPlugin); //, { component: MyNodeComponent });
    editor.use(ContextMenuPlugin);
    editor.use(MinimapPlugin);
    const engine = new Engine('demo@0.2.0');

    components.map((c) => {
      editor.register(c);
      engine.register(c);
    });

    const n1 = await components[0].createNode({ num: 2 });
    const n2 = await components[0].createNode({ num: 0 });
    const add = await components[1].createNode();

    n1.position = [80, 200];
    n2.position = [80, 400];
    add.position = [500, 240];

    editor.addNode(n1);
    editor.addNode(n2);
    editor.addNode(add);

    editor.connect(n1.outputs.get('num'), add.inputs.get('num1'));
    editor.connect(n2.outputs.get('num'), add.inputs.get('num2'));

    editor.on(
      [
        'process',
        'nodecreated',
        'noderemoved',
        'connectioncreated',
        'connectionremoved',
      ],
      (async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
      }) as any
    );

    editor.view.resize();
    editor.trigger('process');
    zoomAt(editor);
  }
}
