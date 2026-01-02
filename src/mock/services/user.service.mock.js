import initialEnergyDetails from "../data/energyDetails.json"
import initialUserDetails from "../data/userDetails.json"
import initialEnergyAlerts from "../data/energyAlerts.json"

let energyDetails = structuredClone(initialEnergyDetails)
let userDetails = structuredClone(initialUserDetails)
let energyAlerts = structuredClone(initialEnergyAlerts)

const currentEnergyState = {
    userId: null,
    physicalEnergy: null,
    mentalEnergy: null,
    physicalDrainPerMin: null,
    mentalDrainPerMin: null,
    lastUpdatedTimestamp: null
}

async function login(userId = 1) {
    const user = userDetails.find(i => i.id === userId)
    if (!user) throw new error("User not found!");

    const energyDetail = energyDetails.find(i => i.userId === userId)
    if (!energyDetail) throw new error("User Energy Detail not found");

    const energyAlert = energyAlerts.find(i => i.energyAlertId === energyDetail.energyAlertId)
    if (!energyAlert) throw new error("User Energy Alert not found");

    const loginResult = {
        userId: userId,
        userName: user.fullName,
        physicalEnergy: energyDetail.physicalEnergy,
        mentalEnergy: energyDetail.mentalEnergy,
        warningLowPhysical:energyAlert.warningLowPhysical,
        warningLowMental:energyAlert.warningLowMental,
        warningHighPhysical:energyAlert.warningHighPhysical,
        warningHighMental:energyAlert.warningHighMental,
        errorLowPhysical: energyAlert.errorLowPhysical,
        errorLowMental: energyAlert.errorLowMental,
        errorHighPhysical: energyAlert.errorHighPhysical,
        errorHighMental: energyAlert.errorHighMental
    }

    currentEnergyState.userId = userId
    currentEnergyState.mentalEnergy = energyDetail.mentalEnergy
    currentEnergyState.physicalEnergy = energyDetail.physicalEnergy
    currentEnergyState.lastUpdatedTimestamp = energyDetail.lastUpdated
    currentEnergyState.mentalDrainPerMin = energyAlert.mentalDrainPerMin
    currentEnergyState.physicalDrainPerMin = energyAlert.physicalDrainPerMin

    return loginResult
}

export const userService = {
    login,
}