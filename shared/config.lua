Config = {
    imagePath = 'nui://ox_inventory/web/images',
    item = 'item_cooking',
    tables = {
        {
            model = 'v_ret_fh_kitchtable',
            coords = vec4(2004.9700, 4983.2939, 40.4416, 306.5025)
        },
    },
    setStatus = function(status, value)
        if GetResourceState("es_extended") ~= "missing" then -- ESX
            value = value * 10000
            if value > 0 then
                TriggerEvent('esx_status:add', status, value)
            else
                TriggerEvent('esx_status:remove', status, -
                    value)
            end
        elseif GetResourceState("qb-core") ~= "missing" then -- QBCore
            local QBCore = exports['qb-core']:GetCoreObject()
            local hunger = QBCore.Functions.GetPlayerData().metadata['hunger']
            local thirst = QBCore.Functions.GetPlayerData().metadata['thirst']
            if status == "hunger" then
                TriggerServerEvent('consumables:server:addHunger',
                    hunger + value)
            elseif status == "thirst" then
                TriggerServerEvent('consumables:server:addThirst',
                    thirst + value)
            elseif status == "stress" then
                if value > 0 then
                    TriggerServerEvent('hud:server:GainStress', value)
                else
                    value = math.abs(value)
                    TriggerServerEvent('hud:server:RelieveStress', value)
                end
            end
        end
    end
}

function Notify(title, description, type)
    lib.notify({
        title = title,
        description = description,
        type = type
    })
end
