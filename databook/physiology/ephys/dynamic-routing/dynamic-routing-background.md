# Dynamic Routing

The Dynamic Routing project aims to uncover the neural mechanisms of flexible decision making. We train mice to perform a visual–auditory switching task in which the rewarded sensory modality alternates within a session, requiring mice to dynamically route sensory information to appropriate motor outputs depending on behavioral context. While mice perform this task, we record from neurons across the mouse brain to identify the neural correlates of flexible sensory-motor associations and to understand how context representations are generated, maintained, and used to guide behavior.


## Recording strategy

Up to six Neuropixels 1.0 probes are inserted simultaneously using the **SHIELD implant**, a chronic implant system that enables repeatable, multi-probe access to dorsal cortex and underlying structures. Probes are inserted at varying angles and anterior–posterior positions to achieve broad coverage spanning cortical, thalamic, basal ganglia, and midbrain regions (among others). This approach allows simultaneous sampling of hundreds of neurons across functionally distinct brain regions while the mouse performs the switching task.

:::{figure} /resources/SHIELD_diagram.png
:name: SHIELD implant
:align: center
:width: 600

Diagram of the SHIELD implant with multiple Neuropixels 1.0 probes.
:::

:::{figure} /resources/brainwide_recording.png
:name: brainwide recording coverage
:align: center
:width: 600

Probe trajectories across mice and sessions showing dense coverage of the left hemisphere.
:::

Several mouse lines used in the dataset express channelrhodopsin (ChR2) in specific inhibitory interneuron classes (Pvalb, Sst, Vip, or all GABAergic via VGAT), enabling [optotagging](../../../background/Optotagging.md) of those cell types during dedicated epochs at the start and end of each session.

## Task

Mice perform a **visual–auditory context-switching task** in which the rewarded stimulus modality alternates across blocks within each session.

### Stimuli and reward contingencies

Each trial presents one of four stimuli: a visual target (VIS1), a visual non-target (VIS2), an auditory target (AUD1), or an auditory non-target (AUD2). Trials are organized into alternating **auditory-rewarded (A)** and **visual-rewarded (V)** blocks. Within each block, only one target stimulus is rewarded:

- **Auditory context (A):** licking to AUD1 earns a water reward; licking to VIS1 is a false alarm.
- **Visual context (V):** licking to VIS1 earns a water reward; licking to AUD1 is a false alarm.

Responses to either non-target stimulus (AUD2, VIS2) are never rewarded regardless of context.

### Session and block structure

A session lasts approximately 60 minutes and consists of six ~10-minute blocks alternating between auditory- and visual-rewarded contexts. **Context is not explicitly cued on every trial** — the mouse must infer and maintain the current context from trial outcomes. Block transitions are signaled by five consecutive presentations of the newly rewarded target stimulus; if the mouse does not lick to earn a contingent reward during these trials, a non-contingent reward is delivered. All four stimuli are then presented in pseudorandom interleaved order for the remainder of the block.

### Trial structure

Each trial begins with a **quiescent period** (~1.5 s) during which licking resets the trial. The stimulus is presented for 0.5 s, followed by a **response window** from 0.1–1.0 s post-stimulus onset. The trial concludes with an **inter-trial interval** of 3–7.5 s.

:::{figure} /resources/DR_task_diagram.png
:name: DR task diagram
:align: center
:width: 800

__a__, Reward contingencies for the auditory (A) and visual (V) contexts. Only the target of the currently rewarded modality yields reward. __b__, Nested timeline of a session (six alternating 10-minute blocks), a block (five rewarded target cue trials followed by pseudo-randomly interleaved stimuli), and a trial (quiescent period, stimulus, response window, ITI).
:::

### Questions to explore 

- Which brain regions have the most visual responsive neurons?

- Which regions are more auditory responsive?

- Do frontal cortical areas have sensory responses?​

- How does spiking activity differ between Miss and Correct Reject trials (compute separately for visual and auditory stimuli)? 

- Do regular spiking neurons (putative excitatory) versus fast spiking neurons (putative inhibitory) have different activity during the task? ​

- Do baseline spiking rates change between the spontaneous versus task epochs of the recording session? Does this vary across areas?​

- How do ear and nose movements correlate with neural activity?​