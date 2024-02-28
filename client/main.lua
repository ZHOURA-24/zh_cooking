local items = lib.require('data/items')
local models = {}
local busy = false

local function ToggleVisible(bool)
    SendNUIMessage({
        action = "setVisible",
        data = bool
    })
    SetNuiFocus(bool, bool)
end

RegisterNuiCallback('hideFrame', function(data, cb)
    ToggleVisible(false)
    cb('ok')
end)

RegisterNuiCallback('cook', function(data, cb)
    if busy and lib.progressActive() then
        return Notify('Error', 'Please wait...', 'error')
    end
    busy = true
    ToggleVisible(false)
    for _ = 1, data.count, 1 do
        if lib.progressCircle({
                duration = 5000,
                position = 'bottom',
                useWhileDead = false,
                canCancel = true,
                disable = {
                    car = true,
                },
                label = 'Cooking...',
                anim = {
                    dict = "amb@prop_human_bbq@male@idle_a",
                    clip = "idle_b",
                },
                prop = {
                    model = `prop_fish_slice_01`,
                    pos = vec3(0.0, 0.0, 0.0),
                    rot = vec3(0.0, 0.0, 0.0),
                    bone = 28422
                },
            }) then
            local result, message = lib.callback.await('zh_cooking:server:cook', false, data.item)
            if not result then
                Notify('Error', message, 'error')
                busy = false
                break
            else
                Notify('Success', message, 'success')
            end
        else
            busy = false
            Notify('Error', 'Cancelled...', 'error')
            break
        end
    end
    busy = false
end)

exports('item_cooking', function(data, slot)
    local metadata = slot.metadata
    local item = lib.waitFor(function()
        for i = 1, #items, 1 do
            if items?[i].name == metadata.name then
                return items?[i]
            end
        end
    end)
    if not item then
        return
    end
    if lib.progressCircle({
            duration = 5000,
            position = 'bottom',
            useWhileDead = false,
            canCancel = true,
            disable = {
                car = true,
            },
            anim = item.anim,
            prop = item.prop,
        })
    then
        exports.ox_inventory:useItem(data, function(result)
            if result then
                for k, v in pairs(item.status) do
                    Config.setStatus(k, v)
                end
            end
        end)
    else
        Notify('Error', 'Cancelled...', 'error')
    end
end)

local function Open(data)
    while #(GetEntityCoords(cache.ped) - GetEntityCoords(data.entity)) > 1.5 do
        Wait(100)
        TaskGoToCoordAnyMeans(cache.ped, data.coords.x, data.coords.y, data.coords.z, 5.0, 0, false, 786603, 0xbf800000)
    end
    TaskTurnPedToFaceEntity(cache.ped, data.entity, 2000)
    if Config.imagePath ~= '' or Config.imagePath ~= nil then
        SendNUIMessage({
            action = "setPathImage",
            data = Config.imagePath
        })
    end
    ToggleVisible(true)
    Wait(100)
    SendNUIMessage({ action = "setItems", data = items })
end

for i = 1, #Config.tables, 1 do
    table.insert(models, Config.tables[i].model)
end

exports.ox_target:addModel(models, {
    {
        name = 'foodmaker',
        event = 'foodmaker',
        icon = 'fas fa-utensils',
        label = 'Make food',
        onSelect = Open,
        distance = 2.0
    }
})