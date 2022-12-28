import { _decorator, Component, Node, RigidBody, Quat, Vec3, Camera } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Motion')
export class Motion extends Component {

    @property({type: Camera})
    cam: Camera;

    rb: RigidBody;
    initPos: Vec3 = new Vec3();
    initRot: Quat = new Quat();

    start() {
        this.initPos = this.node.getWorldPosition();
        this.initRot = this.node.getWorldRotation();
        this.rb = this.node.getComponent(RigidBody);
        this.rb.useGravity = false;
    }

    update(deltaTime: number) {
        this.cam.node.lookAt(this.node.getWorldPosition());
    }

    playSim(){
        let quat1 = new Quat();
        Quat.fromEuler(quat1, -25, 90, 0);
        this.node.setWorldRotation(quat1);
        this.rb.applyLocalImpulse(new Vec3(0, 0, 70));
        this.rb.useGravity = true;
    }

    resetSim(){
        this.rb.useGravity = false;
        this.rb.clearVelocity();
        this.node.setWorldPosition(this.initPos);
        this.node.setWorldRotation(this.initRot);
    }
}

